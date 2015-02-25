<?php
 /**
 * @file CategoryMapper.php
 * @author macherif <maccherif2001@gmail.com>
 * @copyright This App is builded only for test purpose requested by ASWAT TELECOM DEV TEAM 2015
 * @version 1 <This's the first release  >
 * @package mappers
 * @return object < Category Mapper>
 * @todo
 */
 namespace Application\Mappers;
use Library\Mapper\Common as Custom_Mapper_Common;
use Application\Models\Category as Category;
class CategoryMapper extends Custom_Mapper_Common {
    // __construct function overload to define type of storage.
    public function __construct()
    {
        $this->_tableName = 'categories';
        $this->_attributes = array(
            'id' => null,
            'category_name' => null,
            'enabled' => null,
            'parent_id' => null,
        );
    }
    /**
     * Get registered DB instance to add the used database table
     * @return DB instance
     */
    public function getDbTable()
    {
        if (null === $this->_tableName) {
            $this->_tableName('categories');
        }
        return $this->_tableName;
    }
    /**
     * Build a buisness object from an array
     * @param array $row
     * @return \Application_Models_$Category
     */
    public function _hydrate($row)
    {
        $category = new Category();
        if(is_array($row)){
            $row = (object) $row;
        }
        $attributes = array_keys($this->getDbShema());
        $setters = $this->generateModelSetters();
        foreach ($attributes as $iterator => $attribut) {
            $category->$setters[$iterator]($row->$attribut);
        }
        return $category;
    }
    public function update ($params) {
        if (!isset($params['id'])){
            return;
        }
        $category = $this->find($params['id']);
        $category->setCategoryName($params['category_name']);
            $this->save($category);
            return array('success'=>true);
    }
    public function deleteCategory($id){
        if (empty($id)){
            return;
        }
        $category = $this->find($id);
        /**
         * @todo update products with this category with 0 as category_id
         */
        $this->delete($id);
        return array('success'=>true);
        
    }
    public function add ($params){
         $category = new Category();
         $category ->setCategoryName($params['category_name'])
                   ->setEnabled(1)
                   ->setParentId(0);
             $response =  $this->save($category);
         return $response ;
     }
}