import { NoteData, Tag } from '@/App';
import { FormEvent, useRef, useState } from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';
import { v4 as uuidV4 } from 'uuid';

type NoteFormProps = {
	onAddTag: (tag: Tag) => void;
	onSubmit: (data: NoteData) => void;
	availableTags: Tag[];
} & Partial<NoteData>;

export default function NoteForm(props: NoteFormProps) {
	const markdownRef = useRef<HTMLTextAreaElement>(null);
	const titleRef = useRef<HTMLInputElement>(null);

	const [selectedTags, setSelectedTags] = useState<Tag[]>(props.tags || []);

	const navigate = useNavigate();

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		props.onSubmit({
			markdown: markdownRef.current!.value,
			tags: selectedTags,
			title: titleRef.current!.value,
		});

		navigate('..');
	}

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<Stack gap={4}>
					<Row>
						<Col>
							<Form.Group controlId='title'>
								<Form.Label>Title</Form.Label>

								<Form.Control
									ref={titleRef}
									defaultValue={props.title}
									required
								/>
							</Form.Group>
						</Col>

						<Col>
							<Form.Group controlId='tags'>
								<Form.Label>Tags</Form.Label>

								<CreatableReactSelect
									onChange={(tags) => {
										setSelectedTags(
											tags.map((tag) => ({
												id: tag.value,
												label: tag.label,
											})),
										);
									}}
									onCreateOption={(label) => {
										const newTag = { id: uuidV4(), label };
										setSelectedTags((prev) => [...prev, newTag]);
										props.onAddTag(newTag);
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

					<Form.Group controlId='markdown'>
						<Form.Label>Body</Form.Label>

						<Form.Control
							as='textarea'
							ref={markdownRef}
							defaultValue={props.markdown}
							rows={15}
							required
						/>
					</Form.Group>

					<Stack className='justify-content-end' direction='horizontal' gap={2}>
						<Button type='submit' variant='primary'>
							Save
						</Button>

						<Link to='..'>
							<Button type='button' variant='outline-secondary'>
								Cancel
							</Button>
						</Link>
					</Stack>
				</Stack>
			</Form>
		</>
	);
}
