<?php
 /**
 * @file ImageMapper.php
 * @author macherif <maccherif2001@gmail.com>
 * @copyright This App is builded only for test purpose requested by ASWAT TELECOM DEV TEAM 2015
 * @version 1 <This's the first release  >
 * @package mappers
 * @return object < Image Mapper>
 * @todo
 */
 namespace Application\Mappers;
use Library\Mapper\Common as Custom_Mapper_Common;
use Application\Models\Image;
use Api\ImageUploader\BulletProof as Uploader;
class ImageMapper extends Custom_Mapper_Common {
    // __construct function overload to define type of storage.
    public function __construct()
    {
        $this->_tableName = 'images';
        $this->_attributes = array(
            'id' => null,
            'image_name' => null,
            'width' => null,
            'height' => null,
            'alt' => null,
            'title' => null,
        );
    }
    /**
     * Get registered DB instance to add the used database table
     * @return DB instance
     */
    public function getDbTable()
    {
        if (null === $this->_tableName) {
            $this->_tableName('orders');
        }
        return $this->_tableName;
    }
    /**
     * Build a buisness object from an array
     * @param array $row
     * @return \Application_Models_Image
     */
    public function _hydrate($row)
    {
        $image = new Image();
        $attributes = array_keys($this->getDbShema());
        $setters = $this->generateModelSetters();
        foreach ($attributes as $iterator => $attribut) {
            $image->$setters[$iterator]($row->$attribut);
        }
        return $image;
    }
    
    public function upload($file, $name)
    {
        try{
            $uploader = new Uploader();
            $uploader->fileTypes(array("gif", "jpg", "jpeg", "png"));
            $uploader-> uploadDir('assets/upload');
            $uploader ->limitSize(array("min"=>1, "max"=>42000000));
            $fileDir = $uploader->upload($file,$name);
         /* Always use the try/catch block to handle errors */
         }catch(\ImageUploader\ImageUploaderException $e){
             echo $e->getMessage();
         }
         $image = new Image();
         $image->setImageName($fileDir);
        return $image;
    }
}