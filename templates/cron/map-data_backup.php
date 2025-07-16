<?php
	include "four-winds.php";

	$root = str_replace("cron/map-data.php", "", __FILE__);
	$cache_file = $root."cache/map-data.json";
	$es_cache_file = $root."cache/map-data-spanish.json";

	$layers = [
		"upper" => [1, 3, 6, 7],
		"lower" => [2, 4, 8]
	];

	$categories = [
		"Food & Drink" => [
			"category" => "Food & Drink",
			"symbol" => "utensils",
			"points" => []
		],
		"Shopping" => [
			"category" => "Shopping",
			"symbol" => "bag",
			"points" => []
		],
		"Facilities" => [
			"category" => "Facilities",
			"symbol" => "facilities",
			"points" => []
		],
		"Amenities" => [
			"category" => "Amenities",
			"symbol" => "amenities",
			"points" => []
		],
		"Ticket Counters" => [
			"category" => "Ticket Counters",
			"symbol" => "tickets",
			"asset_type" => "",
			"points" => []
		]
	];

	$spanish_categories = [
		"Food & Drink" => [
			"category" => "Food & Drink",
			"symbol" => "utensils",
			"points" => []
		],
		"Shopping" => [
			"category" => "Shopping",
			"symbol" => "bag",
			"points" => []
		],
		"Facilities" => [
			"category" => "Facilities",
			"symbol" => "facilities",
			"points" => []
		],
		"Amenities" => [
			"category" => "Amenities",
			"symbol" => "amenities",
			"points" => []
		],
		"Ticket Counters" => [
			"category" => "Ticket Counters",
			"symbol" => "tickets",
			"asset_type" => "",
			"points" => []
		]
	];

	foreach ($layers as $layer => $asset_map_ids) {
		$layer_assets = [];

		foreach ($asset_map_ids as $asset_map_id) {
			$assets = FourWinds::callAPI("maps/$asset_map_id/assetviews");

			// We want to fail to refresh the data if any portion of the API calls fails
			if (empty($assets["href"])) {
				die("Asset loading failed");
			}

			$layer_assets = array_merge($layer_assets, $assets["items"]);
		}

		foreach ($layer_assets as $item) {
			$name = $es_name = "";
			$gate = "";
			$caption = $es_caption = "";
			$hours = $es_hours = "";
			$phone = $es_phone = "";
			$link = "";
			$concourse = "";
			$post_security = false;
			$image = "";
			$category = "";

			// See if we have a category based on tags
			foreach ($item["tags"] as $tag) {
				if ($tag["name"] == "Restroom" || $tag["name"] == "Nursing") {
					$category = "Facilities";
				}

				if ($tag["name"] == "Relax") {
					$category = "Amenities";
				}

				if ($tag["name"] == "Fitness") {
					$category = "Amenities";
				}
			}

			if (!$category) {
				if ($item["assetType"]["id"] == "4") {
					$category = "Food & Drink";
				} elseif ($item["assetType"]["id"] == "5") {
					$category = "Shopping";
				} elseif ($item["assetType"]["id"] == "8") {
					$category = "Ticket Counters";
				}
			}

			foreach ($item["properties"] as $property) {
				$property["value"] = trim($property["value"]);

				switch ($property["name"]) {
					case "DisplayName_en":
						$name = $property["value"];
						break;
					case "DisplayName_es":
						$es_name = $property["value"];
						break;
					case "Near_en":
						$gate = $property["value"];
						break;
					case "Description_en":
						$caption = $property["value"];
						break;
					case "Description_es":
						$es_caption = $property["value"];
						break;
					case "Hours_en":
						$hours = $property["value"];
						break;
					case "Hours_es":
						$es_hours = $property["value"];
						break;
					case "Phone_en":
						$phone = $property["value"];
						break;
					case "Phone_es":
						$es_phone = $property["value"];
						break;
					case "Web":
						$link = $property["value"];
						break;
					case "Concourse_en":
						$concourse = $property["value"];
						break;
					case "IsPostSecurity":
						$post_security = $property["value"];
						break;
				}
			}

			// Figure out which concourses since the data is suspect at best
			$concourse = str_replace([" ","/"], "", $concourse);
			$concourses = [];

			if (strlen($concourse) == 4) {
				$concourses[] = "Main";
			} else {
				for ($i = 0; $i < strlen($concourse); $i++) {
					$concourses[] = substr($concourse, $i, 1);
				}
			}

			// Get an image
			foreach ($item["fileResources"] as $resource) {
				if (!$image && $resource["typeId"] == 4) {
					$image = $resource["href"];
				}

				if ($resource["typeId"] == 3) {
					$image = $resource["href"];
				}
			}

			$point = [
				"coordinates" => [610 - ($item["y"] - 610), $item["x"]],
				"attr" => [
					"category" => $category,
					"layer" => $layer,
					"title" => $name,
					"airline" => "",
					"gate" => $gate,
					"concourse" => $concourses,
					"labels" => [
						$post_security ? "Post Security" : "Pre Security",
						"Concourse ".implode("/", $concourses)
					],
					"hours" => $hours,
					"phone" => $phone,
					"image" => $image,
					"caption" => $caption,
					"link" => $link
				]
			];

			$point_es = [
				"coordinates" => [610 - ($item["y"] - 610), $item["x"]],
				"attr" => [
					"category" => $category ? $spanish_categories[$category]["category"] : "",
					"layer" => $layer,
					"title" => $es_name,
					"airline" => "",
					"gate" => $gate,
					"concourse" => $concourses,
					"labels" => [
						$post_security ? "Post Security" : "Pre Security",
						"Concourse ".implode("/", $concourses)
					],
					"hours" => $es_hours,
					"phone" => $es_phone,
					"image" => $image,
					"caption" => $es_caption,
					"link" => $link
				]
			];

			if ($category) {
				$categories[$category]["points"][] = $point;
				$spanish_categories[$category]["points"][] = $point_es;
			}
		}
	}

	file_put_contents($cache_file, json_encode($categories, JSON_PRETTY_PRINT |  JSON_UNESCAPED_SLASHES));
	file_put_contents($es_cache_file, json_encode($spanish_categories, JSON_PRETTY_PRINT |  JSON_UNESCAPED_SLASHES));
