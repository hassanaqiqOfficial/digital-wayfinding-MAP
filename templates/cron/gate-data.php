<?php
	include "four-winds.php";

	$root = str_replace("cron/gate-data.php", "", __FILE__);
	$cache_file = $root."cache/gate-data.json";

	$assets = FourWinds::callAPI("maps/5/assetviews");

	if (empty($assets["href"])) {
		die("Asset loading failed");
	}

	$points = [];
	foreach ($assets["items"] as $item) {
		$points[$item["name"]] = [
			"coordinates" => [610 - ($item["y"] - 610), $item["x"]],
		];
	}
	file_put_contents($cache_file, json_encode($points, JSON_PRETTY_PRINT |  JSON_UNESCAPED_SLASHES));
