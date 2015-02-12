<?php
 /**
 * @file UserController.php
 * @author macherif <maccherif2001@gmail.com>
 * @copyright This App is builded only for test purpose requested by ASWAT TELECOM DEV TEAM 2015
 * @version 1 <This's the first release  >
 * @package Controllers
 * @return object < User Controller>
 * @todo
 */

 namespace Application\Controllers;
 use Application\Mappers\UserMapper as UserMapper;
 class UserController {
     public function __construct ()
     {
         
     }
     
     public function authentication ($params){
         $mapper = new UserMapper();
         
         $response =  $mapper->authenticate ($params['username'], $params['password']);
         
         return is_null($response) ? array('error'=> true, 'msg' => 'Login Failed') : array(
                                                                                            'succes'=>true,
                                                                                            'data'=>$response);
         
     }
 } 