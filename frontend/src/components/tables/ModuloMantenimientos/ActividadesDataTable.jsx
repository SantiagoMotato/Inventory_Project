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
import { FaSearch } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import {columns, /* users,  */statusOptions} from "../data/actividadesData";
import {capitalize} from "../../pages/utils";
import axios from 'axios'
import {useState, useEffect} from 'react'
import ModalActualizarActividad from '../../modals/MantenimientosModals/ActividadesModals/ModalActualizarActividad'

const statusColorMap = {
  activo: "success",
  inactivo: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["id_actividad", "fecha_actividad", "descripcion", "fk_mantenimiento", "fk_tecnico", "fk_equipo", "fk_user_responsable", "actions"];

export default function ActividadesDataTable() {

  //Estados para abrir solo el formulario para actualizar una actividad
  const [selectedActividad, setSelectedActividad] = useState(null);
  const [isModalOpenUpdate, setModalOpenUpdate] = useState(false);
  const handleOpenModalUpdate = (actividad) => {
    setSelectedActividad(actividad);
    setModalOpenUpdate(true);
    console.log(actividad);
  };
  const handleCloseModalUpdate = () => setModalOpenUpdate(false);

const [actividades, setActividades] = useState([]);

const getActividades = async() => {
    try {
        const res = await axios.get("http://localhost:4000/actividades/listar");
        const data = res.data;
        setActividades(data);
        console.log(data);
    } catch (error) {
        console.log("Error al cargar las actividades: ",error);
    }
}

useEffect(() => {
  getActividades();
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
    let filteredUsers = [...actividades];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((actividad) =>
        actividad.descripcion.toLowerCase().includes(filterValue.toLowerCase()) ||
        actividad.nombre_equipo.toLowerCase().includes(filterValue.toLowerCase()) ||
        actividad.nombres_responsable.toLowerCase().includes(filterValue.toLowerCase()) ||
        actividad.apellidos_responsable.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((actividad) =>
        Array.from(statusFilter).includes(actividad.status),
      );
    }

    return filteredUsers;
  }, [actividades, filterValue, statusFilter]);

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

  const renderCell = React.useCallback((actividad, columnKey) => {
    const cellValue = actividad[columnKey];

    switch (columnKey) {
      case "id_actividad":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            {/* <p className="text-bold text-small capitalize text-default-500">{mantenimiento.id_mantenimiento}</p> */}
          </div>
        );
      case "tipo_mantenimiento":
        return (
          <div className="flex flex-col">
            {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
            <p className="text-bold text-small capitalize text-default-500">{actividad.tipo_mantenimiento}</p>
          </div>
        );
      case "fecha_actividad":
        return (
          <div className="flex flex-col">
            {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
            <p className="text-bold text-small capitalize text-default-700 rounded-md text-center">{actividad.fecha_actividad}</p>
          </div>
        );
        case "descripcion":
          return (
            <div className="flex flex-col">
              {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
              <p className="text-bold text-small capitalize text-default-600 bg-slate-100 p-1">{actividad.descripcion}</p>
            </div>
          );
      case "fk_mantenimiento":
        return (
          <div className="flex flex-col">
          {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
          <p className="text-bold text-small capitalize text-default-700">{actividad.fk_mantenimiento}</p>
          </div>
        );
      case "fk_tecnico":
        return (
          <div className="flex flex-col">
          {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
          <p className="relative right-4 text-bold text-small text-center capitalize text-default-700 py-1 px-1 bg-teal-100 rounded-md">{`${actividad.nombres_tecnico} ${actividad.apellidos_tecnico}`}</p>
          </div>
        );
      case "fk_equipo":
        return (
          <div className="flex flex-col">
          {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
          <p className="relative right-4 text-bold text-small text-center capitalize text-default-700 py-1 px-1">{actividad.nombre_equipo}</p>
          </div>
        );
      case "fk_user_responsable":
        return (
          <div className="flex flex-col">
          {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
          <p className="relative right-4 text-bold text-small text-center capitalize text-default-700 py-1 px-1 bg-teal-100 rounded-md">{`${actividad.nombres_responsable} ${actividad.apellidos_responsable}`}</p>
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
                <DropdownItem onClick={() => handleOpenModalUpdate(actividad)/* () => console.log(actividad) */}>Editar</DropdownItem>
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
            placeholder="Buscar actividad..."
            startContent={<FaSearch className="text-xl text-default-500"/>}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
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
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total: {actividades.length} actividades</span>
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
    actividades.length,
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
        classNames={{
            wrapper: "h-[340px] max-h-[500px] w-[1200px] overflow-y-auto",
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
        <TableBody emptyContent={"Actividad No Encontrado!"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id_actividad}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ModalActualizarActividad actividad={selectedActividad} isOpen={isModalOpenUpdate} onOpen={handleOpenModalUpdate} onClose={handleCloseModalUpdate} getActividades={getActividades}/>
    </div>
  );
}