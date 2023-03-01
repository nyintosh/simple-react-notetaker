import {
	EditNote,
	NewNote,
	NoteLayout,
	NoteList,
	ViewNote,
} from '@/components';
import { useLocalStorage } from '@/hooks';
import { useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';

export type Tag = {
	id: string;
	label: string;
};

export type NoteData = {
	markdown: string;
	tags: Tag[];
	title: string;
};

export type Note = {
	id: string;
} & NoteData;

export type RawNoteData = {
	markdown: string;
	tagIds: string[];
	title: string;
};

export type RawNote = {
	id: string;
} & RawNoteData;

export default function App() {
	const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
	const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);

	const notesWithTags = useMemo(
		() =>
			notes.map((note) => ({
				...note,
				tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
			})),
		[notes, tags],
	);

	const createTag = (tag: Tag) => {
		setTags((prev) => [...prev, tag]);
	};

	const updateTag = (id: string, label: string) => {
		setTags((prev) =>
			prev.map((tag) => (tag.id === id ? { ...tag, label } : tag)),
		);
	};

	const deleteTag = (id: string) => {
		setTags((prev) => prev.filter((tag) => tag.id !== id));
	};

	const createNote = ({ tags, ...data }: NoteData) => {
		setNotes((prev) => [
			...prev,
			{ ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
		]);
	};

	const updateNote = (id: string, { tags, ...data }: NoteData) => {
		setNotes((prev) =>
			prev.map((note) =>
				note.id === id
					? { ...note, ...data, tagIds: tags.map((tag) => tag.id) }
					: note,
			),
		);
	};

	const deleteNote = (id: string) => {
		setNotes((prev) => prev.filter((note) => note.id !== id));
	};

	return (
		<Container className='my-4'>
			<Routes>
				<Route
					path='/'
					element={
						<NoteList
							onUpdateTag={updateTag}
							onDeleteTag={deleteTag}
							availableTags={tags}
							notes={notesWithTags}
						/>
					}
				/>

				<Route
					path='/new'
					element={
						<NewNote
							onAddTag={createTag}
							onSubmit={createNote}
							availableTags={tags}
						/>
					}
				/>

				<Route path='/:id' element={<NoteLayout notes={notesWithTags} />}>
					<Route index element={<ViewNote onDelete={deleteNote} />} />

					<Route
						path='edit'
						element={
							<EditNote
								onAddTag={createTag}
								onSubmit={updateNote}
								availableTags={tags}
							/>
						}
					/>
				</Route>

				<Route path='*' element={<Navigate to={'/'} />} />
			</Routes>
		</Container>
	);
}
