<?php
	date_default_timezone_set("America/New_York");
	$root = str_replace("cron/flight-data.php", "", __FILE__);
	$file =	"/home/comnetfids/eclipsx.xml";

	$airline_logos = [
		"AA",
		"AC",
		"AS",
		"B6",
		"BA",
		"DL",
		"LF",
		"NK",
		"UA",
		"VX",
		"WN",
		"WW"
	];

	$arrivals = [];
	$departures = [];
	$alldates = [];
	$airlines = [];

	$xml = simplexml_load_file($file);
	// print_r($xml);
	// die(0);
/*
	<row id="1902816" adi="D" schedule="2017-08-24T08:00:00" actual="2017-08-24T12:00:00" change="2017-08-24T04:17:54.160">
		<line>Spirit Airlines</line>
		<linecode>NK</linecode>
		<number>385</number>
		<logo>Spirit_156x28.jpg</logo>
		<bulletlogo></bulletlogo>
		<gate>D12</gate>
		<claim></claim>
		<city code="TPA">Tampa</city>
		<status code="ON">On Time</status>
	</row>
*/
	$aircodes = [
		"ACA" => "AC",
		"ASA" => "AS",
		"AAY" => "G4",
		"AAL" => "AA",
		"4B" => "4B",
		"BAW" => "BA",
		"CFG" => "DE",
		"DAL" => "DL",
		"JBU" => "B6",
		"SOU" => "9X",
		"SWA" => "WN",
		"NKS" => "NK",
		"SWG" => "WG",
		"UAL" => "UA",
		"WOW" => "WW",
		"CXP" => "XP"
	];

	foreach ($xml->row as $row) {
		$row_data = [];
		$row_data["scheduled"] = (string) $row["schedule"];
		$row_data["scheduled_date"] = date("Ymd", strtotime($row_data["scheduled"]));
		$row_data["scheduled_date_formatted"] = date("D, M j", strtotime($row_data["scheduled"]));
		$row_data["scheduled_time"] = date("g:i A", strtotime($row_data["scheduled"]));
		$row_data["actual"] = (string) $row["actual"];
		$row_data["actual_date"] = date("Ymd", strtotime($row_data["actual"]));
		$row_data["actual_date_formatted"] = date("D, M j", strtotime($row_data["actual"]));
		$row_data["actual_time"] = date("g:i A", strtotime($row_data["actual"]));
		$row_data["airline"] = (string) $row->line;
		$airlines[] = $row_data["airline"];
		$row_data["airline_code"] = (string) $row->linecode;
		if (array_key_exists($row_data["airline_code"],$aircodes)) {
			$row_data["airline_shortcode"] = $aircodes[$row_data["airline_code"]];
		} else {
			$row_data["airline_shortcode"] = $row_data["airline_code"];
		}
		$row_data["airline_logo"] = (string) $row->logo;
		if (in_array($row_data["airline_shortcode"],$airline_logos)) {
			$row_data["airline_logo_gif"] = $row_data["airline_shortcode"];
		} else {
			$row_data["airline_logo_gif"] = "default";
		}		
		$row_data["flight_number"] = (string) $row->number;
		$row_data["gate"] = (string) $row->gate;
		$row_data["baggage_claim"] = (string) $row->claim;
		$row_data["city"] = (string) $row->city;
		$row_data["airport_code"] = (string) $row->city["code"];
		$row_data["status_text"] = (string) $row->status;
		$row_data["status_code"] = (string) $row->status["code"];
		$type = (string) $row["adi"];
		if ($type == "D") {
			$departures[] = $row_data;
		} else {
			$arrivals[] = $row_data;
		}
		$alldates[$row_data["scheduled_date_formatted"]] = $row_data["scheduled_date"];
	}

	asort($alldates);
	$dates = array_keys($alldates);

	$unique_airlines = array_unique($airlines);
	sort($unique_airlines);

	$output = array("Arrivals" => $arrivals, "Departures" => $departures, "Dates" => $dates, "Airlines" => $unique_airlines);
	$hud_output = $dates;

	file_put_contents($root."cache/flight-data.json", json_encode($output, JSON_PRETTY_PRINT |  JSON_UNESCAPED_SLASHES));
	file_put_contents($root."cache/hud-data.json", json_encode($hud_output, JSON_PRETTY_PRINT |  JSON_UNESCAPED_SLASHES));

