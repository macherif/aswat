<?php
 /**
 * @file ImageController.php
 * @author macherif <maccherif2001@gmail.com>
 * @copyright This App is builded only for test purpose requested by ASWAT TELECOM DEV TEAM 2015
 * @version 1 <This's the first release  >
 * @package Controllers
 * @return object < Image Controller>
 * @todo
 */

 namespace Application\Controllers;
 use Application\Mappers\ImageMapper;
 class ImageController {
     public function __construct ()
     {
         
     }
     public function fetch ($params){
         $mapper = new ImageMapper();
         
         if(!empty($params['id'])){
             $response =  array($mapper->getOne($params['id']));
         }else{
             $response =  $mapper->fetch();
         }
         
         return $response ;
         
     }
     public function ImgPath($params) {
         $mapper = new ImageMapper();
         
         if(!empty($params['id'])){
             $response =  array($mapper->ImgPath($params['id']));
         }else{
             $response =  FALSE;
         }
         
         return $response ;
     }
 } 