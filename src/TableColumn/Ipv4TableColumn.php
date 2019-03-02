<?php
declare(strict_types=1);

namespace SetBased\Abc\Table\TableColumn;

use SetBased\Abc\Helper\Html;

/**
 * Table column for table cells with IPv4 addresses.
 */
class Ipv4TableColumn extends TableColumn
{
  //--------------------------------------------------------------------------------------------------------------------
  /**
   * The field name of the data row used for generating this table column.
   *
   * @var string
   */
  protected $fieldName;

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Object constructor.
   *
   * @param string|int|null $headerText The header text of this table column.
   * @param string          $fieldName  The key to be used for getting the value from the data row.
   */
  public function __construct($headerText, string $fieldName)
  {
    parent::__construct('ipv4', $headerText);

    $this->fieldName = $fieldName;
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * {@inheritdoc}
   */
  public function getHtmlCell(array $row): string
  {
    return '<td class="ipv4">'.Html::txt2Html($row[$this->fieldName]).'</td>';
  }

  //--------------------------------------------------------------------------------------------------------------------
}

//----------------------------------------------------------------------------------------------------------------------
