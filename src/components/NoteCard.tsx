import { Tag } from '@/App';
import styles from '@/components/NoteList.module.css';
import { Badge, Card, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type NoteCardProps = {
	tags: Tag[];
	title: string;
	id: string;
};

export default function NoteCard(props: NoteCardProps) {
	return (
		<Card
			className={`h-100 text-reset text-decoration-none ${styles.card}`}
			as={Link}
			to={`/${props.id}`}
		>
			<Card.Body>
				<Stack
					className='align-items-center justify-content-center h-100'
					gap={2}
				>
					<span className='fs-5'>{props.title}</span>

					{props.tags.length > 0 && (
						<Stack
							className='justify-content-center flex-wrap'
							direction='horizontal'
							gap={1}
						>
							{props.tags.map((tag) => (
								<Badge key={tag.id} className='text-truncate'>
									{tag.label}
								</Badge>
							))}
						</Stack>
					)}
				</Stack>
			</Card.Body>
		</Card>
	);
}
