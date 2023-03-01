import { Note } from '@/App';
import { Navigate, Outlet, useParams } from 'react-router-dom';

type NoteLayoutProps = {
	notes: Note[];
};

export default function NoteLayout(props: NoteLayoutProps) {
	const { id } = useParams();

	const note = props.notes.find((note) => note.id === id);

	if (!note) return <Navigate to='/' replace />;

	return <Outlet context={note} />;
}
