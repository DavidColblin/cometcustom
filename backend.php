<?php

/* ##### CONFIGURATIONS ######### 
Mods by DavidM.
*/

$filename  = dirname(__FILE__).'/data.txt';

/* ##### CONFIGURATIONS #########*/


$filename  = dirname(__FILE__).'/data.txt';

// store new message in the file
	$msg = isset($_GET['msg']) ? $_GET['msg'] : '';
	if ($msg != '')
	{
	  file_put_contents($filename,$msg);
	  die();
	}	

// infinite loop until the data file is not modified
$lastmodif    = isset($_GET['timestamp']) ? $_GET['timestamp'] : 0;
$currentmodif = filemtime($filename);
while ($currentmodif <= $lastmodif) // check if the data file has been modified
{
  usleep(10000); // sleep 10ms to unload the CPU
  clearstatcache();
  $currentmodif = filemtime($filename);
}

// return a json array
$response = array();
$response['msg']       = file_get_contents($filename);
$response['timestamp'] = $currentmodif;
echo json_encode($response);
flush();

?>