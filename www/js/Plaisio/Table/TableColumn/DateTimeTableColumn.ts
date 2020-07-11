import {OverviewTable} from "../OverviewTable";
import {TextTableColumn} from "./TextTableColumn";

/**
 * Table column for date and datetime.
 */
export class DateTimeTableColumn extends TextTableColumn
{
  //--------------------------------------------------------------------------------------------------------------------
  /**
   * @inheritDoc
   */
  public getSortKey(tableCell): string
  {
    return $(tableCell).attr('data-value');
  }

  //--------------------------------------------------------------------------------------------------------------------
}

//----------------------------------------------------------------------------------------------------------------------
OverviewTable.registerTableColumn('date', DateTimeTableColumn);
OverviewTable.registerTableColumn('datetime', DateTimeTableColumn);