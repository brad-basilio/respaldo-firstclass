import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '@Adminto/Base';
import CreateReactScript from '@Utils/CreateReactScript';
import Table from '../Components/Adminto/Table';
import DxButton from '../Components/dx/DxButton';
import ReactAppend from '@Utils/ReactAppend';
import LockerRequestsRest from '@Rest/Admin/LockerRequestsRest';
import Modal from '@Adminto/Modal';
import Swal from 'sweetalert2';

const lockerRequestsRest = new LockerRequestsRest()

const LockerRequests = () => {
  const gridRef = useRef()
  const modalRef = useRef()

  const [dataLoaded, setDataLoaded] = useState(null)

  const onDeleteClicked = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar solicitud',
      text: '¿Estás seguro de eliminar esta solicitud de casillero?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (!isConfirmed) return
    const result = await lockerRequestsRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onModalOpen = (data) => {
    if (!data.seen) {
      lockerRequestsRest.boolean({
        id: data.id,
        field: 'seen',
        value: true
      })
      $(gridRef.current).dxDataGrid('instance').refresh()
    }
    setDataLoaded(data)
    $(modalRef.current).modal('show');
  }

  return (<>
    <Table gridRef={gridRef} title='Solicitudes de Casillero Virtual' rest={lockerRequestsRest}
      toolBar={(container) => {
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'refresh',
            hint: 'Refrescar tabla',
            onClick: () => $(gridRef.current).dxDataGrid('instance').refresh()
          }
        });
      }}
      columns={[
        {
          dataField: 'id',
          caption: 'ID',
          visible: false
        },
        {
          dataField: 'name',
          caption: 'Nombre',
          cellTemplate: (container, { data }) => {
            ReactAppend(container, <span style={{
              width: '100%',
              fontWeight: data.seen ? 'lighter' : 'bold',
              cursor: 'pointer'
            }} onClick={() => onModalOpen(data)}>
              {data.name}
            </span>)
          }
        },
        {
          dataField: 'email',
          caption: 'Correo',
        },
        {
          dataField: 'phone',
          caption: 'Teléfono',
        },
        {
          dataField: 'document_type',
          caption: 'Tipo Doc.',
          width: 100
        },
        {
          dataField: 'document_number',
          caption: 'N° Documento',
        },
        {
          dataField: 'city',
          caption: 'Ciudad',
        },
        {
          dataField: 'created_at',
          caption: 'Fecha',
          dataType: 'datetime',
          format: 'yyyy-MM-dd HH:mm:ss',
          sortOrder: 'desc'
        },
        {
          dataField: 'seen',
          caption: 'Estado',
          dataType: 'boolean',
          cellTemplate: (container, { data }) => {
            if (data.seen) {
              ReactAppend(container, <span className='badge bg-success rounded-pill'>Revisado</span>)
            } else {
              ReactAppend(container, <span className='badge bg-danger rounded-pill'>Pendiente</span>)
            }
          }
        },
        {
          caption: 'Acciones',
          cellTemplate: (container, { data }) => {
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-primary',
              title: 'Ver solicitud',
              icon: 'fa fa-eye',
              onClick: () => onModalOpen(data)
            }))
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-danger',
              title: 'Eliminar',
              icon: 'fa fa-trash',
              onClick: () => onDeleteClicked(data.id)
            }))
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
    <Modal modalRef={modalRef} title='Solicitud de Casillero Virtual' hideFooter >
      <div style={{ maxHeight: '70vh', overflowY: 'auto', overflowX: 'hidden' }}>
        {/* Información Personal */}
        <div className="mb-4">
          <h5 className="text-primary mb-3">
            <i className="fa fa-user me-2"></i>
            Información Personal
          </h5>
          <div className="row g-3">
            <div className="col-md-12">
              <div className="border-start border-primary border-3 ps-3 py-2 bg-light">
                <small className="text-muted d-block mb-1">Nombre Completo</small>
                <strong className="d-block text-break">{dataLoaded?.name}</strong>
              </div>
            </div>
            <div className="col-md-6">
              <div className="border-start border-info border-3 ps-3 py-2 bg-light">
                <small className="text-muted d-block mb-1">Correo Electrónico</small>
                <strong className="d-block text-break">{dataLoaded?.email || <i className='text-muted'>- No proporcionado -</i>}</strong>
              </div>
            </div>
            <div className="col-md-6">
              <div className="border-start border-success border-3 ps-3 py-2 bg-light">
                <small className="text-muted d-block mb-1">Teléfono</small>
                <strong className="d-block text-break">{dataLoaded?.phone || <i className='text-muted'>- No proporcionado -</i>}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Documento de Identidad */}
        <div className="mb-4">
          <h5 className="text-primary mb-3">
            <i className="fa fa-id-card me-2"></i>
            Documento de Identidad
          </h5>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="border-start border-warning border-3 ps-3 py-2 bg-light">
                <small className="text-muted d-block mb-1">Tipo de Documento</small>
                <strong className="d-block text-break">{dataLoaded?.document_type}</strong>
              </div>
            </div>
            <div className="col-md-6">
              <div className="border-start border-warning border-3 ps-3 py-2 bg-light">
                <small className="text-muted d-block mb-1">Número de Documento</small>
                <strong className="d-block text-break">{dataLoaded?.document_number}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Ubicación */}
        <div className="mb-4">
          <h5 className="text-primary mb-3">
            <i className="fa fa-map-marker-alt me-2"></i>
            Ubicación
          </h5>
          <div className="row g-3">
            <div className="col-md-12">
              <div className="border-start border-secondary border-3 ps-3 py-2 bg-light">
                <small className="text-muted d-block mb-1">Dirección</small>
                <strong className="d-block text-break">{dataLoaded?.address || <i className='text-muted'>- No proporcionada -</i>}</strong>
              </div>
            </div>
            <div className="col-md-6">
              <div className="border-start border-secondary border-3 ps-3 py-2 bg-light">
                <small className="text-muted d-block mb-1">Ciudad</small>
                <strong className="d-block text-break">{dataLoaded?.city || <i className='text-muted'>- No proporcionada -</i>}</strong>
              </div>
            </div>
            <div className="col-md-6">
              <div className="border-start border-secondary border-3 ps-3 py-2 bg-light">
                <small className="text-muted d-block mb-1">Departamento</small>
                <strong className="d-block text-break">{dataLoaded?.department || <i className='text-muted'>- No proporcionado -</i>}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje Adicional */}
        {dataLoaded?.message && (
          <div className="mb-4">
            <h5 className="text-primary mb-3">
              <i className="fa fa-comment-alt me-2"></i>
              Mensaje Adicional
            </h5>
            <div className="border-start border-danger border-3 ps-3 py-2 bg-light">
              <p className="mb-0 text-break" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{dataLoaded?.message}</p>
            </div>
          </div>
        )}

        {/* Información de Registro */}
        <div className="mt-4 pt-3 border-top">
          <div className="d-flex align-items-center text-muted">
            <i className="fa fa-clock me-2"></i>
            <small className="text-break">
              Solicitud recibida el: <strong>{dataLoaded?.created_at ? new Date(dataLoaded.created_at).toLocaleString('es-PE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }) : '-'}</strong>
            </small>
          </div>
        </div>
      </div>
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<BaseAdminto {...properties} title='Solicitudes de Casillero'>
    <LockerRequests {...properties} />
  </BaseAdminto>);
})
