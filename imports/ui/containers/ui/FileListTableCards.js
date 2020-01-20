import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import ReactTable from "react-table";
import IntlMessages from "../../helpers/IntlMessages";
import DataTablePagination from "../../components/DatatablePagination";

const dataTableColumns = [
  {
    Header: "Name",
    accessor: "name",
    Cell: props => <p className="list-item-heading">{props.value}</p>
  },
  {
    Header: "Owner",
    accessor: "owner",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: "Date",
    accessor: "date",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: "Comments",
    accessor: "comments",
    Cell: props => <p className="text-muted">{props.value}</p>
  }
];

export const FileListTableWithPaginationCard = props => {
  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle>
          <IntlMessages id="fileviewer.filelist" />
        </CardTitle>
        <ReactTable
          data={props.data}
          columns={dataTableColumns}
          defaultPageSize={5}
          showPageJump={false}
          showPageSizeOptions={true}
          PaginationComponent={DataTablePagination}
          className={"react-table-fixed-height"}
        />
      </CardBody>
    </Card>
  );
};