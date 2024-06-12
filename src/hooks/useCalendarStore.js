import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';
import { calendarApi } from '../api';
import { convertDateOfEvente } from '../helpers';
import Swal from 'sweetalert2';

const optionSwal = {
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`
}

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector(state => state.calendar);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {

        try {
            if (calendarEvent.id) {
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent }));
                return;
            }

            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));

        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events');

            const events = convertDateOfEvente(data.eventos);
            dispatch(onLoadEvents(events));

        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);
        }
    }

    const startDeleteEvent = async () => {

        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
            Swal.fire('Evento eliminado', `El evento "${activeEvent.title}" a sido eliminado`, 'success');
            dispatch(onDeleteEvent());
        } catch (error) {
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }


    }


    return {
        //* Propierties
        activeEvent,
        events,
        hasEventSeleted: !!activeEvent,

        //* metodos
        setActiveEvent,
        startDeleteEvent,
        startLoadingEvents,
        startSavingEvent,
    }

}