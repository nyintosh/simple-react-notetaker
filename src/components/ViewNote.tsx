import { useNote } from '@/helpers';
import { Badge, Button, Col, Row, Stack } from 'react-bootstrap';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Link, useNavigate } from 'react-router-dom';

type ViewNoteProps = {
	onDelete: (id: string) => void;
};

export default function ViewNote(props: ViewNoteProps) {
	const note = useNote();

	const navigate = useNavigate();

	return (
		<>
			<Row className='align-items-center mb-4'>
				<Col>
					<h1>{note.title}</h1>

					{note.tags.length > 0 && (
						<Stack className='flex-wrap' direction='horizontal' gap={1}>
							{note.tags.map((tag) => (
								<Badge key={tag.id} className='text-truncate'>
									{tag.label}
								</Badge>
							))}
						</Stack>
					)}
				</Col>

				<Col xs='auto'>
					<Stack gap={2} direction='horizontal'>
						<Link to={`/${note.id}/edit`}>
							<Button variant='primary'>Edit</Button>
						</Link>

						<Button
							onClick={() => {
								props.onDelete(note.id);
								navigate('..');
							}}
							variant='outline-danger'
						>
							Delete
						</Button>

						<Link to={`..`}>
							<Button variant='outline-secondary'>Back</Button>
						</Link>
					</Stack>
				</Col>
			</Row>

			<ReactMarkdown>{note.markdown}</ReactMarkdown>
		</>
	);
}
