import { Tag } from '@/App';
import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap';

type EditTagsModalProps = {
	handleClose: () => void;
	onUpdate: (id: string, label: string) => void;
	onDelete: (id: string) => void;
	availableTags: Tag[];
	show: boolean;
};

export default function EditTagsModal(props: EditTagsModalProps) {
	return (
		<Modal onHide={props.handleClose} show={props.show}>
			<Modal.Header closeButton>
				<Modal.Title>Edit Tags</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form>
					<Stack gap={2}>
						{props.availableTags.map((tag) => (
							<Row key={tag.id}>
								<Col>
									<Form.Control
										onChange={(e) => props.onUpdate(tag.id, e.target.value)}
										type='text'
										value={tag.label}
									/>
								</Col>

								<Col xs='auto'>
									<Button
										onClick={() => props.onDelete(tag.id)}
										variant='outline-danger'
									>
										&times;
									</Button>
								</Col>
							</Row>
						))}
					</Stack>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
