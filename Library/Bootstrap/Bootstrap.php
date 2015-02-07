<?php
/**
 * @file Bootstrap.php
 * @author macherif <maccherif2001@gmail.com>
 * @copyright This App is builded only for test purpose requested by ASWAT TELECOM DEV TEAM 2015
 * @version 1 <This's the first release  >
 * @package Library
 * @subpackage Bootstrap
 * @return object < Bootstarp>
 * @todo
 */
namespace Library\Bootstrap;
class Bootstrap {
    public $params;
    public function __construct() {
        $this -> params = array_merge($_POST, $_GET);
        
    }

    public function run() {
        if (in_array('ajax', $this -> params)) {

        } else {
            require_once 'Application/Views/header.php';
            require_once 'Application/Views/footer.php';
        }
    }

}
?>