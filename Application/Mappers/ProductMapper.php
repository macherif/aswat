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
        $product = new Application\Models\Product();
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
}