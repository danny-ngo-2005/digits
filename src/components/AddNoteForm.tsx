'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addNote } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddNoteSchema } from '@/lib/validationSchemas';
import { Contact } from '@prisma/client';

const AddNoteForm = ({
  contact,
  onAddNote,
}: {
  contact: Contact;
  onAddNote: (newNote: Note) => void;
}) => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddNoteSchema),
  });

  const onSubmit = async (data: { note: string; contactId: number; owner: string }) => {
    const newNote = await addNote(data); // Assuming `addNote` returns the created note
    onAddNote(newNote); // Update the parent component's state
    swal('Success', 'Your note has been added', 'success', {
      timer: 2000,
    });
    reset();
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Card>
      <Card.Header>Add Timestamped Note</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Note</Form.Label>
            <input
              type="text"
              {...register('note')}
              className={`form-control ${errors.note ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.note ? 'is-invalid' : ''}</div>
          </Form.Group>
          <input type="hidden" {...register('owner')} value={currentUser} />
          <input type="hidden" {...register('contactId')} value={contact?.id || ''} />
          <Form.Group className="form-group">
            <Row className="pt-3">
              <Col>
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </Col>
              <Col>
                <Button
                  type="button"
                  onClick={() => reset()}
                  variant="warning"
                  className="float-right"
                >
                  Reset
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddNoteForm;