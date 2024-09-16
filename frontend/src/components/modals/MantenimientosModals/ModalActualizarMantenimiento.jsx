
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { Toaster, toast } from 'sonner';
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import {Textarea} from "@nextui-org/react";

function ActualizarMantenimiento({ isOpen, onClose, mantenimiento, getMantenimientosUpdate }) {

  const [descripcion, setDescripcion] = useState("");

  const [mantenimientoData, setMantenimientoData] = useState({
    tipo_mantenimiento:'',
    fecha_mantenimiento:'',
    descripcion:'',
    fk_user_responsable:'',
    fk_equipo:'',
  });

    const [size] = React.useState("md");
    const sizes = ["5xl"];
    const variants = ["underlined"];

    const [validationMessages, setValidationMessages] = useState("");

    const [tipo_mantenimiento, setTipoMantenimiento] = useState([]);
    const tipoDeMantenimientos = ['predictivo','preventivo','correctivo'];
    const [equipos, setEquipos] = useState([]);
    const [usersResponsables, setUsersResponsables] = useState([]);

    const limpiarFormulario = () => {
      setMantenimientoData({
          tipo_mantenimiento:'',
          fecha_mantenimiento:'',
          descripcion:'',
          fk_user_responsable:'',
          fk_equipo:'',
      });
      setValidationMessages("");
    };

  const getMantenimientos = async() => {
    try {
        const res = await axios.get("http://localhost:4000/mantenimientos/listar");
        const data = res.data;
        // console.log(data)
        setTipoMantenimiento(data);
    } catch (error) {
        console.log("Error al traer los mantenimientos: ",error);
    }
  }

  const getEquipos = async() => {
    try {
        const res = await axios.get("http://localhost:4000/equipos/listar");
        const data = res.data;
        // console.log(data)
        setEquipos(data);
    } catch (error) {
        console.log("Error al traer los equipos: ",error);
    }
  }

  const getUsersResponsables = async() => {
    try {
        const res = await axios.get("http://localhost:4000/usuarios/listar");
        const data = res.data;
        // console.log(data)
        setUsersResponsables(data);
    } catch (error) {
        console.log("Error al traer los usuarios: ",error);
    }
  }

  const putMantenimiento = async () => {
    try {
      const res = await axios.put(`http://localhost:4000/mantenimientos/actualizar/${mantenimientoData.id_mantenimiento}`, {
        ...mantenimientoData
      });
      const data = res.data;
      console.log("Mantenimiento actualizado:", data);
      limpiarFormulario();
      onClose();
      toast.info('Mantenimiento Actualizado!', {
        description: "El mantenimiento ha sido actualizado con éxito!",
        icon: <FaCheckCircle className="text-blue-500 text-xl"/>,
        style: { height: "90px", fontSize: '15px', }
      });
      getMantenimientosUpdate();
    } catch (error) {
      setValidationMessages(error.response.data.msg);
      console.log("Error al actualizar el mantenimiento:", error.response.data);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.values(mantenimientoData).some(value => value === "")) {
      toast.warning('Por favor, completa todos los campos requeridos!', {
        style: { height: "90px", fontSize: '15px', },
        icon: <IoIosWarning style={{ fontSize: "24px" }} />,
        duration: 2000
      });
      return;
    }
    await putMantenimiento();
  };

  useEffect(() => {
    if (mantenimiento) {
      setMantenimientoData(mantenimiento);
    }
    getMantenimientos();
    getEquipos();
    getUsersResponsables();
  }, [mantenimiento]);

  const handleChange = (e) => {
    setMantenimientoData({
      ...mantenimientoData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <Modal size={sizes} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-3xl font-extrabold text-center text-default-500 border-b-3 w-[900px] mx-auto">
              Actualizar Mantenimiento
            </ModalHeader>
            <ModalBody>
              <form className="flex flex-col justify-center mx-auto pt-6 pb-5 px-8 w-[900px]" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-10 gap-x-52 mx-auto">
                  <div className="w-full flex flex-col">
                    {variants.map((variant) => (
                      <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Select
                          variant={variant}
                          label={
                            <span>
                              {"Tipo Mantenimiento - "}
                              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                {mantenimientoData.tipo_mantenimiento}
                              </span>
                            </span>}
                          name="tipo_mantenimiento"
                          value={mantenimientoData.tipo_mantenimiento}
                          onChange={(e) => setMantenimientoData({ ...mantenimientoData, tipo_mantenimiento: e.target.value })}
                          className="max-w-xs"
                        >
                          {tipoDeMantenimientos.map((tipoMantenimiento) => (
                            <SelectItem key={tipoMantenimiento} value={tipoMantenimiento}>
                              {tipoMantenimiento}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                    ))}
                    {validationMessages && validationMessages.some(([campo]) => campo === 'fk_unidad_productiva') && (
                      <p className="text-xs text-red-600 font-semibold">
                        {validationMessages.find(([campo]) => campo === 'fk_unidad_productiva')[1]}
                      </p>
                    )}
                  </div>
                  <div className="w-full flex flex-col">
                      <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                          type="date"
                          variant="underlined"
                          label="Fecha Mantenimiento"
                          name="fecha_mantenimiento"
                          value={mantenimientoData.fecha_mantenimiento}
                          onChange={handleChange}
                        />
                      </div>
                      {
                          validationMessages && validationMessages.some(([campo]) => campo === 'email') && (
                            <p className="text-xs text-red-600 font-semibold">
                              {validationMessages.find(([campo]) => campo === 'email')[1]}
                            </p>
                          )
                        }
                  </div>
                  <div className="w-full flex flex-col">
                      <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Textarea
                          placeholder="Ingrese una descripción"
                          className="max-w-xs"
                          label="Descripción"
                          value={mantenimientoData.descripcion}
                          onChange={handleChange}
                          name="descripcion"
                        />
                      </div>
                      {
                          validationMessages && validationMessages.some(([campo]) => campo === 'descripcion') && (
                            <p className="text-xs text-red-600 font-semibold">
                              {validationMessages.find(([campo]) => campo === 'descripcion')[1]}
                            </p>
                          )
                        }
                  </div>
                  <div className="w-full flex flex-col">
                    {variants.map((variant) => (
                      <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Select
                          variant={variant}
                          label={
                            <span>
                              {"Responsable - "}
                              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                {`${mantenimientoData.nombres_user_responsable} ${mantenimientoData.apellidos_user_responsable}`}
                              </span>
                            </span>}
                          name="responsable"
                          value={mantenimientoData.nombres_user_responsable}
                          onChange={(e) => setMantenimientoData({ ...mantenimientoData, fk_user_responsable: e.target.value })}
                          className="max-w-xs"
                        >
                          {usersResponsables.map((user) => (
                            <SelectItem key={user.id_usuario} value={user.id_usuario}>
                              {`${user.nombres} ${user.apellidos}`}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                    ))}
                    {validationMessages && validationMessages.some(([campo]) => campo === 'fk_unidad_productiva') && (
                      <p className="text-xs text-red-600 font-semibold">
                        {validationMessages.find(([campo]) => campo === 'fk_unidad_productiva')[1]}
                      </p>
                    )}
                  </div>
                  <div className="w-full flex flex-col">
                    {variants.map((variant) => (
                      <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Select
                          variant={variant}
                          label={
                            <span>
                              { "Equipo - "}
                              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                {mantenimientoData.nombre_equipo}
                              </span>
                            </span>}
                          name="fk_equipo"
                          value={mantenimientoData.fk_equipo}
                          onChange={(e) => setMantenimientoData({ ...mantenimientoData, fk_equipo: e.target.value })}
                          className="max-w-xs"
                        >
                          {equipos.map((equipo) => (
                            <SelectItem key={equipo.id_equipo} value={equipo.id_equipo}>
                              {equipo.nombre_equipo}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                    ))}
                    {validationMessages && validationMessages.some(([campo]) => campo === 'fk_unidad_productiva') && (
                      <p className="text-xs text-red-600 font-semibold">
                        {validationMessages.find(([campo]) => campo === 'fk_unidad_productiva')[1]}
                      </p>
                    )}
                  </div>
                </div>
              <ModalFooter className="relative left-[94px] top-7">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Actualizar
                </Button>
              </ModalFooter>
              </form>
            </ModalBody>
          </>
            )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ActualizarMantenimiento;