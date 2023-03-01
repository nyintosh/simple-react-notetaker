import { NoteData, Tag } from '@/App';
import { NoteForm } from '@/components';

type NewNoteProps = {
	onAddTag: (tag: Tag) => void;
	onSubmit: (data: NoteData) => void;
	availableTags: Tag[];
};

export default function NewNote(props: NewNoteProps) {
	return (
		<>
			<h1 className='mb-4'>New Note</h1>

			<NoteForm
				onAddTag={props.onAddTag}
				onSubmit={props.onSubmit}
				availableTags={props.availableTags}
			/>
		</>
	);
}
