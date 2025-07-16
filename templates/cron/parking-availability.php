<?php
	
	$root = str_replace("cron/parking-availability.php", "", __FILE__);
	$dir = $root."cache/parking-xml/";
	
	$types = [
		"Hourly" => "hourly.xml",
		"Daily" => "daily.xml",
		"Express" => "express.xml",
		"Long-Term A" => "long-term.xml"
	];

	$json_array = [];
	$output = [];

	// Get all the XML files in the directory
	foreach ($types as $label => $file) {
		$xml = simplexml_load_file($dir.$file);

		foreach ($xml->CounterConfiguration as $configuration) {
			if (strpos($configuration->Name, "Spaces Available") !== false) {
				$available = intval($configuration->CurrentValue);
				$total = intval($configuration->Count_Max);
				$percentage = round(100 * $available / $total);

				if ($percentage <= 1) {
					$status = "Lot Full";
					$class = "lot-full";
				} elseif ($percentage <= 30) {
					$status = "Mostly Full";
					$class = "mostly-full";
				} elseif ($percentage <= 70) {
					$status = "Available";
					$class = "available";
				} else {
					$status = "Mostly Open";
					$class = "mostly-open";
				}

				$json_array[$label] = [
					"available" => $available,
					"class" => $class,
					"total" => $total,
					"percentage" => $percentage,
					"status" => $status
				];
			}
		}
	}

	// Add a second file to Long-Term
	$xml = simplexml_load_file($dir."long-termb.xml");

	foreach ($xml->CounterConfiguration as $configuration) {
		if (strpos($configuration->Name, "Spaces Available") !== false) {
			$available = intval($configuration->CurrentValue) + $json_array["Long-Term"]["available"];
			$total = intval($configuration->Count_Max) + $json_array["Long-Term"]["total"];
			$percentage = round(100 * $available / $total);

			if ($percentage <= 1) {
				$status = "Lot Full";
				$class = "lot-full";
			} elseif ($percentage <= 30) {
				$status = "Mostly Full";
				$class = "mostly-full";
			} elseif ($percentage <= 70) {
				$status = "Available";
				$class = "available";
			} else {
				$status = "Mostly Open";
				$class = "mostly-open";
			}

			$json_array["Long-Term B"] = [
				"available" => $available,
				"class" => $class,
				"total" => $total,
				"percentage" => $percentage,
				"status" => $status
			];

		}
	}

	date_default_timezone_set("America/New_York");
	$output["updated"] = "*as of <time>" . date("g:ia") . "</time>";
	$output["lots"] = $json_array;
	print_r($output);

	file_put_contents($root."cache/parking-availability.json", json_encode($output, JSON_PRETTY_PRINT |  JSON_UNESCAPED_SLASHES));

