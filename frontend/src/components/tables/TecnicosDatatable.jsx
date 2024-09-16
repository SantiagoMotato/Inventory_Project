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
import { MdPersonSearch  } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import {columns, /* users,  */statusOptions} from "../tables/data/tecnicosData";
import {capitalize} from "../pages/utils";
import axios from 'axios'
import {useState, useEffect} from 'react'
import ModalRegistrarTecnico from '../modals/TecnicosModals/ModalRegistrarTénico'
import ModalActualizarTecnico from '../modals/TecnicosModals/ModalActualizarTecnico'

const statusColorMap = {
  activo: "success",
  inactivo: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["identificacion","nombres_tecnico","apellidos_tecnico", "email", "telefono", "actions"];

export default function App() {

  const [selectedTecnico, setSelectedTecnico] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const [isModalOpenUpdate, setModalOpenUpdate] = useState(false);
  const handleOpenModalUpdate = (tecnico) => {
    setSelectedTecnico(tecnico);
    setModalOpenUpdate(true);
    console.log(tecnico);
  };
  const handleCloseModalUpdate = () => setModalOpenUpdate(false);

const [tecnicos, setTecnicos] = useState([]);

const getTecnicos = async() => {
    try {
        const res = await axios.get("http://localhost:4000/tecnicos/listar");
        const data = res.data;
        setTecnicos(data);
        console.log(data);
    } catch (error) {
        console.log("Error al cargar los tecnicos: ",error);
    }
}

useEffect(() => {
  getTecnicos();
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
    let filteredUsers = [...tecnicos];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((tecnico) =>
        //Se convierte el valor de 'Identificación' a un texto para que se pueda ser enocntrado ya que, desde la base de datos, es de tipo 'Int'. Convertir ambos valores a una cadena de texto (si tecnico.identificacion es un número) y luego usar includes. Así puedes seguir buscando partes del número de identificación
        tecnico.identificacion.toString().includes(filterValue.toString()) || 
         // tecnico.identificacion.toLowerCase().includes(filterValue.toLowerCase()) ||
        tecnico.nombres.toLowerCase().includes(filterValue.toLowerCase()) ||
        tecnico.apellidos.toLowerCase().includes(filterValue.toLowerCase()) ||
        tecnico.correo.toLowerCase().includes(filterValue.toLowerCase()) ||
        tecnico.telefono.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((tecnico) =>
        Array.from(statusFilter).includes(tecnico.status),
      );
    }

    return filteredUsers;
  }, [tecnicos, filterValue, statusFilter]);

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

  const renderCell = React.useCallback((tecnico, columnKey) => {
    const cellValue = tecnico[columnKey];

    switch (columnKey) {
      case "identificacion":
        return (
          <div className="flex flex-col">
            {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
            <p className="text-bold text-small capitalize rounded-md bg-slate-100 p-1 text-default-900">{tecnico.identificacion}</p>
          </div>
        );
      case "nombres_tecnico":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-small capitalize text-default-700">{tecnico.nombres}</p>
          </div>
        );
      case "apellidos_tecnico":
        return (
          <div className="flex flex-col">
            {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
            <p className="text-bold text-small capitalize text-default-700 text-center">{tecnico.apellidos}</p>
          </div>
        );
        case "email":
          return (
            <div className="flex flex-col">
              {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
              <p className="text-bold text-small capitalize text-default-700 rounded-md bg-slate-100 p-1">{tecnico.correo}</p>
            </div>
          );
      case "telefono":
        return (
          <div className="flex flex-col">
          {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
          <p className="text-bold text-small capitalize text-default-700">{tecnico.telefono}</p>
          {/* <p className="text-bold text-small capitalize text-default-500">{tecnico.apellidos_user_responsable}</p> */}
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
                <DropdownItem onClick={/* ()=>console.log(mantenimiento) */() => handleOpenModalActividad(tecnico)/* ()=>alert(mantenimiento.id_mantenimiento) */}>Registrar actividad</DropdownItem>
                <DropdownItem onClick={ () => handleOpenModalUpdate(tecnico)/* () => console.log(mantenimiento) */}>Editar</DropdownItem>
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
            placeholder="Buscar técnico..."
            startContent={<MdPersonSearch  className="text-3xl text-default-500"/>}
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
            <Button className="bg-[#8bddbc] text-md" onClick={handleOpenModal} /* color="primary"  *//* endContent={<FaUsers />} */>
            <TfiPlus size={20}/>
              Técnico
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total: {tecnicos.length} técnicos</span>
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
    tecnicos.length,
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
        <TableBody emptyContent={"Ténico No Encontrado!"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id_tecnico}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ModalRegistrarTecnico isOpen={isModalOpen} onOpen={handleOpenModal} onClose={handleCloseModal} getTecnicos={getTecnicos}/>
      <ModalActualizarTecnico tecnico={selectedTecnico} isOpen={isModalOpenUpdate} onOpen={handleOpenModalUpdate} onClose={handleCloseModalUpdate} getTecnicos={getTecnicos}/>
    </div>
  );
}