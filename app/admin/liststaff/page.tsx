import React, { Fragment } from "react";
import ListStaff from "../../components/admin/ListStaff";
import GetListUser from "@/app/actions/getListUser";

export const metadata = {
  title: "Manage Staff Admin",
};

export default async function ListStaffPage() {
  const listUser = await GetListUser();

  return (
    <Fragment>
      <ListStaff listUser={listUser} />;
    </Fragment>
  );
}
