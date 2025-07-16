<?php
	class FourWinds {

		static function getAssets($map_id) {
			$data = static::callAPI("maps/$map_id/assetviews");
            return count($data["items"]) ? $data["items"] : null;
		}

		static function getMaps() {
			$data = static::callAPI("maps");
			
			return count($data["items"]) ? $data["items"] : null;
		}

		static function callAPI($endpoint) {
			$assets= json_decode(static::cURL("https://bwi.service.aocdms.com/".$endpoint, false, [
				CURLOPT_HTTPHEADER => ["Accept: text/json"]
			]), true);
			print_r($assets["items"]);
			return json_decode(static::cURL("https://bwi.service.aocdms.com/".$endpoint, false, [
				CURLOPT_HTTPHEADER => ["Accept: text/json"]
			]), true);
		}
	
		static function cURL($url, $post = false, $options = [], $strict_security = false, $output_file = false) {
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

	}