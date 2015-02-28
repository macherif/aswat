<?php
 /**
 * @file ProductMapper.php
 * @author macherif <maccherif2001@gmail.com>
 * @copyright This App is builded only for test purpose requested by ASWAT TELECOM DEV TEAM 2015
 * @version 1 <This's the first release  >
 * @package mappers
 * @return object < Product Mapper>
 * @todo
 */
 
namespace Application\Mappers;
use Library\Mapper\Common as Custom_Mapper_Common;
use Application\Models\Product as Product;
use Application\Mappers\ImageMapper;

class ProductMapper extends Custom_Mapper_Common {
    // __construct function overload to define type of storage.
    public function __construct()
    {
        $this->_tableName = 'products';
        $this->_attributes = array(
            'id' => null,
            'product_name' => null,
            'teaser' => null,
            'description' => null,
            'image_id' => null,
            'category_id' => null,
            'price' => null,
        );
    }
    /**
     * Get registered DB instance to add the used database table
     * @return DB instance
     */
    public function getDbTable()
    {
        if (null === $this->_tableName) {
            $this->_tableName('roles');
        }
        return $this->_tableName;
    }
    /**
     * Build a buisness object from an array
     * @param array $row
     * @return \Application_Models_User
     */
    public function _hydrate($row)
    {
        $product = new Product();
        if(is_array($row)){
            $row = (object) $row;
        }
        $attributes = array_keys($this->getDbShema());
        $setters = $this->generateModelSetters();
        foreach ($attributes as $iterator => $attribut) {
            $product->$setters[$iterator]($row->$attribut);
        }
        return $product;
    }
    public function update ($params) {
        if (!isset($params['id'])){
            return;
        }
        $product = $this->find($params['id']);
        $product->setProductName($params['product_name'])
                 ->setTeaser($params['teaser'])
                 ->setDescription($params['description'])
                 //->setImageId($imageId)
                 ->setPrice($params['price']);
            $this->save($product);
            return array('success'=>true);
    }
    public function updateImage($params){
        $row = (array) json_decode($params['data']);
        $imageMapper = new ImageMapper(); 
        $imageMapper->deleteImage($row['image_id']);
        $imageObj = $imageMapper->upload($_FILES['file'], time());
        $product = $this->find($row['id']);
        $imageObj->setAlt('Picture of ' . $product->getProductName());
            $imageObj->setTitle('Picture of ' . $product->getProductName());
            $imageObj->setWidth('');
            $imageObj->setHeight('');
            $imageObj = $imageMapper->save($imageObj);
        $product->setImageId($imageObj->getId());
        $response =  $this->save($product);
         return $response ;
        
    }
    public function deleteProduct($id){
        if (empty($id)){
            return;
        }
        $product = $this->find($id);
        $imageMapper = new ImageMapper();
        $imageMapper->deleteImage($product->getImageId());
        $this->delete($id);
        return array('success'=>true);
        
    }
    public function add ($params){
        $row = (array) json_decode($params['data']);
        $imageMapper = new ImageMapper(); 
        $imageObj = $imageMapper->upload($_FILES['file'], time());
        $imageObj->setAlt('Picture of ' . $row['product_name' ]);
            $imageObj->setTitle('Picture of ' . $row['product_name']);
            $imageObj->setWidth('');
            $imageObj->setHeight('');
            $imageObj = $imageMapper->save($imageObj);
            $product = new Product();
            $product ->setProductName($row['product_name'])
                 ->setTeaser($row['teaser'])
                 ->setDescription($row['description'])
                 ->setImageId($imageObj->getId())
                 ->setCategoryId($row['category_id'])
                 ->setPrice($row['price']);
             $response =  $this->save($product);
         return $response ;
     }
}