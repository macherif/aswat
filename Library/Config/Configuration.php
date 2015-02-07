<?php
/**
 * @file Bootstrap.php
 * @author macherif <maccherif2001@gmail.com>
 * @copyright This App is builded only for test purpose requested by ASWAT TELECOM DEV TEAM 2015
 * @version 1 <This's the first release  >
 * @package Library
 * @subpackage Config
 * @return object < Configuration>
 * @todo
 */
 namespace Library\Config;
 final class Configuration {
     private static $_instance;
     public $host;
     public $db;
     public $user;
     public $pwd;
     public $port;
     
     private function __construct ($host='localhost', $db ='aswat', $user ='root', $pwd ='enima29', $port = NULL)
     {
         $this->host = $host;
         $this->db = $db;
         $this->user = $user;
         $this->pwd = $pwd;
         $this->port = $port;
     }
     
     public static function getInstance()
     {
         if (true === is_null(self::$_instance)) {
            self::$_instance = new self();
        }

        return self::$_instance;
     }
     
     /**
     * Private clone method to prevent cloning of the instance of the
     * *Singleton* instance.
     *
     * @return void
     */
    private function __clone()
    {
    }

    /**
     * Private unserialize method to prevent unserializing of the *Singleton*
     * instance.
     *
     * @return void
     */
    private function __wakeup()
    {
    }
 }
?>