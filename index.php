<?php
/**
 * @file index.php
 * Main Task Switcher
 * @author macherif <maccherif2001@gmail.com>
 * @copyright This App is builded only for test purpose requested by ASWAT TELECOM DEV TEAM 2015
 * @version 1 <This's the first release  >
 * @todo
 */
 use Library\Bootstrap\Bootstrap as Bootstrap;
 error_reporting(E_ALL);
function __autoload($class)
{
    $path = str_replace('\\', DIRECTORY_SEPARATOR, $class);
    require_once($path . '.php');
}

 spl_autoload_register("__autoload");
 
 $boot = new Bootstrap();
 $boot->run();
 
?>