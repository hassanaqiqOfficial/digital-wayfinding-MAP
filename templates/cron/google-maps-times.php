<?php
	$key = "AIzaSyAXyt-dcs6PuLSMrlP06zoEFR6Aa6azXrY";

	$root = str_replace("cron/google-maps-times.php", "", __FILE__);
	$cache_file = $root."cache/google-maps-times.json";
	$origins = [
		"Baltimore" => "Baltimore,MD",
		"DC" => "Washington D.C.",
		"Annapolis" => "Annapolis, MD"
	];
	
	$failures = false;
	$cache_data = [];

	foreach ($origins as $cache_key => $origin) {
		$json = cURL("https://maps.googleapis.com/maps/api/directions/json?origin=".urlencode($origin)."&destination=BWI%20Airport&key=".$key);

		if ($json) {
			$data = json_decode($json, true);

			if (empty($data["routes"][0]["legs"][0]["duration"]["text"])) {
				$failures = true;
			} else {
				$cache_data[$cache_key] = $data["routes"][0]["legs"][0]["duration"]["text"];
			}
		} else {
			$failures = true;
		}
	}

	$output = [];
	date_default_timezone_set("America/New_York");
	$output["updated"] = "*as of " . date("g:ia");
	$output["origins"] = $cache_data;

	if (!$failures) {
		file_put_contents($cache_file, json_encode($output, JSON_PRETTY_PRINT |  JSON_UNESCAPED_SLASHES));
	}

	function cURL($url, $post = false, $options = [], $strict_security = false, $output_file = false) {
		global $bigtree;

		// Startup cURL and set the URL
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);

		// Determine whether we're forcing valid SSL on the peer and host
		if (!$strict_security) {
			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
		}

		// If we're returning to a file we setup a file pointer rather than waste RAM capturing to a variable
		if ($output_file) {
			$file_pointer = fopen($output_file, "w");
			curl_setopt($ch, CURLOPT_FILE, $file_pointer);
		} else {
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		}

		// Setup post data
		if ($post !== false) {
			// Use cURLFile for any file uploads
			if (function_exists("curl_file_create") && is_array($post)) {
				foreach ($post as &$post_field) {
					if (substr($post_field, 0, 1) == "@" && file_exists(substr($post_field, 1))) {
						$post_field = curl_file_create(substr($post_field, 1));
					}
				}
				unset($post_field);
			}

			curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
		}

		// Any additional cURL options
		if (count($options)) {
			foreach ($options as $key => $opt) {
				curl_setopt($ch, $key, $opt);
			}
		}

		$output = curl_exec($ch);

		curl_close($ch);

		// If we're outputting to a file, close the handle and return nothing
		if ($output_file) {
			fclose($file_pointer);

			return;
		}

		return $output;
	}
