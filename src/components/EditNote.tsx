import { NoteData, Tag } from '@/App';
import { NoteForm } from '@/components';
import { useNote } from '@/helpers';

type EditNoteProps = {
	onAddTag: (tag: Tag) => void;
	onSubmit: (id: string, data: NoteData) => void;
	availableTags: Tag[];
};

export default function EditNote(props: EditNoteProps) {
	const note = useNote();

	return (
		<>
			<h1 className='mb-4'>Edit Note</h1>

			<NoteForm
				onAddTag={props.onAddTag}
				onSubmit={(data) => props.onSubmit(note.id, data)}
				availableTags={props.availableTags}
				markdown={note.markdown}
				tags={note.tags}
				title={note.title}
			/>
		</>
	);
}
