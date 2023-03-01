import { Note, Tag } from '@/App';
import { EditTagsModal, NoteCard } from '@/components';
import { useMemo, useState } from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';

type NoteListProps = {
	onDeleteTag: (id: string) => void;
	onUpdateTag: (id: string, label: string) => void;
	availableTags: Tag[];
	notes: Note[];
};

export default function NoteList(props: NoteListProps) {
	const [isEditTagsModalOpen, setIsEditTagsModalOpen] = useState(false);
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [title, setTitle] = useState('');

	// prettier-ignore
	const filteredNotes = useMemo(
		() => props.notes.filter(
				(note) => (title === '' || note.title.toLowerCase().includes(title.toLowerCase())) && 
					(selectedTags.length === 0 || selectedTags.every((tag) => note.tags.some((noteTag) => noteTag.id === tag.id)))
			),
		[props.notes, selectedTags, title]
	);

	return (
		<>
			<Row className='align-items-center mb-4'>
				<Col>
					<h1>Notes</h1>
				</Col>

				<Col xs='auto'>
					<Stack gap={2} direction='horizontal'>
						<Link to='/new'>
							<Button variant='primary'>Create</Button>
						</Link>

						<Button
							onClick={() => setIsEditTagsModalOpen(true)}
							variant='outline-secondary'
						>
							Edit Tags
						</Button>
					</Stack>
				</Col>
			</Row>

			<Form>
				<Row className='mb-4'>
					<Col>
						<Form.Group controlId='title'>
							<Form.Label>Title</Form.Label>

							<Form.Control
								onChange={(e) => setTitle(e.target.value)}
								type='text'
								value={title}
							/>
						</Form.Group>
					</Col>

					<Col>
						<Form.Group controlId='tags'>
							<Form.Label>Tags</Form.Label>

							<ReactSelect
								onChange={(tags) => {
									setSelectedTags(
										tags.map((tag) => ({
											id: tag.value,
											label: tag.label,
										})),
									);
								}}
								options={props.availableTags.map((tag) => ({
									label: tag.label,
									value: tag.id,
								}))}
								value={selectedTags.map((tag) => ({
									label: tag.label,
									value: tag.id,
								}))}
								isMulti
							/>
						</Form.Group>
					</Col>
				</Row>
			</Form>

			<Row className='g-3' xs={1} sm={2} lg={3} xl={4}>
				{filteredNotes.map((note) => (
					<Col key={note.id}>
						<NoteCard id={note.id} title={note.title} tags={note.tags} />
					</Col>
				))}
			</Row>

			<EditTagsModal
				handleClose={() => setIsEditTagsModalOpen(false)}
				onDelete={props.onDeleteTag}
				onUpdate={props.onUpdateTag}
				availableTags={props.availableTags}
				show={isEditTagsModalOpen}
			/>
		</>
	);
}
