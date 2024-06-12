import { useCalendarStore, useUiStore } from "../../hooks";

export const FadDelete = () => {

  const { startDeleteEvent, hasEventSeleted } = useCalendarStore();

  const handleDelete = () => {
    startDeleteEvent();
  }

  return (
    <button className="btn btn-danger fab-danger" onClick={ handleDelete } style={{ display: hasEventSeleted ? '' : 'none' }} >
      <i className="fas fa-trash-alt"></i>
    </button>
  )
}

