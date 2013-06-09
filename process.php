<?php
session_start();

$arr = new ArrayObject($_REQUEST['arr']);
$chunk = $_REQUEST['index'];

$it = $arr->getIterator();

$string = '';
$index = $chunk*50;
$userInfo= $_SERVER['REMOTE_ADDR'].",".$_REQUEST['windowX']."x".$_REQUEST['windowY'].",";

while($it->valid()){
	$value_array = $it->current();
	$string .= date("Ymd").",".date("His").",".$index.",".$value_array['x'].",".$value_array['y'].",".$value_array['time'].",".$value_array['fname']."\n";
	
	$index++;
	$it->next();
}

try{
	$fp = fopen("./loganalysis/mousetrack_".date("Ymd")."_".session_id().".txt", "a+");
	$result = fwrite($fp, $userInfo);
	$result = fwrite($fp, $string); // Data format: time of save, index, x coord, y coord, milliseconds, file name
}catch(Exception $e){
	die($e);
}

fclose($fp);
echo $result;

?>