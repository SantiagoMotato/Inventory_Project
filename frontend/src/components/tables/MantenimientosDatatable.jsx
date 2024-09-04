import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from "@nextui-org/react";
import { TfiPlus } from "react-icons/tfi";
import { IoFilterSharp } from "react-icons/io5";
import { TbSettingsSearch } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import {columns, /* users,  */statusOptions} from "../tables/data/matenimientos";
import {capitalize} from "../pages/utils";
import axios from 'axios'
import {useState, useEffect} from 'react'
import ModalRegistrarMantenimiento from '../modals/MantenimientosModals/ModalRegistrarMantenimiento'
// import ModalActualizarUsuario from '../modals/UsersModals/ActualizarUsuario'


const statusColorMap = {
  activo: "success",
  inactivo: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["id_mantenimiento","tipo_mantenimiento","fecha_mantenimiento", "descripcion", "nombres_user_responsable", "nombre_equipo", "actions"];

export default function App() {

  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  // const [isModalOpenUpdate, setModalOpenUpdate] = useState(false);
  // const handleOpenModalUpdate = (user) => {
  //   setSelectedUser(user); // Guardar el usuario seleccionado
  //   setModalOpenUpdate(true);
  //   console.log(user);
  // };
  // const handleCloseModalUpdate = () => setModalOpenUpdate(false);
  // const [selectedUser, setSelectedUser] = useState(null);

const [mantenimientos, setMantenimientos] = useState([]);

const getMantenimientos = async() => {
    try {
        const res = await axios.get("http://localhost:4000/mantenimientos/listar");
        const data = res.data;
        setMantenimientos(data);
        console.log(data);
    } catch (error) {
        console.log("Error al cargar los mantenimientos: ",error);
    }
}

useEffect(() => {
  getMantenimientos();
  }, []);


  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...mantenimientos];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((mantenimiento) =>
        mantenimiento.descripcion.toLowerCase().includes(filterValue.toLowerCase()) ||
        mantenimiento.nombre_equipo.toLowerCase().includes(filterValue.toLowerCase()) ||
        mantenimiento.nombres_user_responsable.toLowerCase().includes(filterValue.toLowerCase()) ||
        mantenimiento.apellidos_user_responsable.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((mantenimiento) =>
        Array.from(statusFilter).includes(mantenimiento.status),
      );
    }

    return filteredUsers;
  }, [mantenimientos, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((mantenimiento, columnKey) => {
    const cellValue = mantenimiento[columnKey];

    switch (columnKey) {
      case "id_mantenimiento":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            {/* <p className="text-bold text-small capitalize text-default-500">{mantenimiento.id_mantenimiento}</p> */}
          </div>
        );
      case "tipo_mantenimiento":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            {/* <p className="text-bold text-small capitalize text-default-500">{mantenimiento.tipo_mantenimiento}</p> */}
          </div>
        );
      case "fecha_mantenimiento":
        return (
          <div className="flex flex-col">
            {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
            <p className="text-bold text-small capitalize text-default-500 bg-blue-100 rounded-md text-center">{mantenimiento.fecha_mantenimiento}</p>
          </div>
        );
        case "descripcion":
          return (
            <div className="flex flex-col">
              {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
              <p className="text-bold text-small capitalize text-default-500 bg-slate-100 p-1">{mantenimiento.descripcion}</p>
            </div>
          );
      case "nombres_user_responsable":
        return (
          <div className="flex flex-col">
          {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
          <p className="text-bold text-small capitalize text-default-700">{mantenimiento.nombres_user_responsable}</p>
          <p className="text-bold text-small capitalize text-default-500">{mantenimiento.apellidos_user_responsable}</p>
          </div>
        );
      case "nombre_equipo":
        return (
          <div className="flex flex-col">
          {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
          <p className="relative right-4 text-bold text-small text-center capitalize text-default-500 py-1 px-1 bg-teal-100 rounded-md">{mantenimiento.nombre_equipo}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <FaEdit className="text-default-400 text-2xl ml-1" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem onClick={() => console.log(mantenimiento)}>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-1 mt-2 w-full">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar mantenimiento..."
            startContent={<TbSettingsSearch className="text-2xl text-default-500"/>}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            {/* <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<BsPersonFillCheck className="text-lg" />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> */}
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<IoFilterSharp className="text-lg" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button className="bg-[#8bddbc] text-md" onClick={handleOpenModal} /* color="primary"  *//* endContent={<FaUsers />} */>
            <TfiPlus size={20}/>
              Mantenimiento
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total: {mantenimientos.length} mantenimientos</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    mantenimientos.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-1 px-2 flex justify-between items-center w-[800px]">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div className="mt-2 mx-auto w-fit">
        <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
      //   classNames={{
      //     wrapper: "max-h-[382px] w-[800px] bg-slate-100 mx-auto",
      //   }}
      classNames={{
          wrapper: "h-[390px] max-h-[500px] w-[1200px] overflow-y-auto",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"Mantenimiento No Encontrado!"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id_mantenimiento}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ModalRegistrarMantenimiento isOpen={isModalOpen} onOpen={handleOpenModal} onClose={handleCloseModal}/>
      {/* <ModalActualizarUsuario user={selectedUser} isOpen={isModalOpenUpdate} onClose={handleCloseModalUpdate} getUsuarios={getUsuarios}/> */}
    </div>
  );
}