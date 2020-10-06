<?php
declare(strict_types=1);

namespace Plaisio\Table\TableColumn;

use Plaisio\Helper\Html;

/**
 * Table column for table cells with multiple email addresses.
 */
class MultiEmailTableColumn extends TableColumn
{
  //--------------------------------------------------------------------------------------------------------------------
  /**
   * The character for separating multiple email addresses in the input data.
   *
   * @var string
   */
  protected string $dataSeparator;

  /**
   * The field name of the data row used for generating this table column.
   *
   * @var string
   */
  protected string $fieldName;

  /**
   * The character for separating multiple email addresses  in the generated HTML code.
   *
   * @var string
   */
  protected string $htmlSeparator;

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Object constructor.
   *
   * @param string|int|null $header         The header text of this table column.
   * @param string          $fieldName      The key to be used for getting the value from the data row.
   * @param string          $dataSeparator  The character for separating multiple email addresses in the input data.
   * @param string          $htmlSeparator  The HTML snippet for separating multiple email addresses in the generated
   *                                        HTML code.
   * @param bool            $headerIsHtml   If and only if true the header is HTML code.
   */
  public function __construct($header,
                              string $fieldName,
                              string $dataSeparator = ',',
                              string $htmlSeparator = '<br/>',
                              bool $headerIsHtml = false)
  {
    parent::__construct('email', $header, $headerIsHtml);

    $this->fieldName     = $fieldName;
    $this->dataSeparator = $dataSeparator;
    $this->htmlSeparator = $htmlSeparator;
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * {@inheritdoc}
   */
  public function getHtmlCell(array $row): string
  {
    $value = $row[$this->fieldName];

    if ($value!==false && $value!==null && $value!=='')
    {
      // Value has 1 or more mail addresses.
      $addresses = explode($this->dataSeparator, $value);

      $html = '<td class="email">';
      foreach ($addresses as $i => $address)
      {
        if ($i) $html .= $this->htmlSeparator;
        $html .= Html::generateElement('a', ['href' => 'mailto:'.$address], $address);
      }
      $html .= '</td>';

      return $html;
    }
    else
    {
      // The value is empty.
      return '<td></td>';
    }
  }

  //--------------------------------------------------------------------------------------------------------------------
}

//----------------------------------------------------------------------------------------------------------------------
