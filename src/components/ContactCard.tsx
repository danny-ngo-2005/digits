'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, Image, ListGroup } from 'react-bootstrap';
import { Contact, Note } from '@prisma/client';
import NoteItem from './NoteItem';
import AddNoteForm from './AddNoteForm';

const ContactCard = ({ contact, notes }: { contact: Contact; notes: Note[] }) => {
  const [noteList, setNoteList] = useState<Note[]>(notes);

  const handleAddNote = (newNote: Note) => {
    setNoteList((prevNotes) => [...prevNotes, newNote]);
  };

  return (
    <Card>
      <Card.Header>
        <Image src={contact.image} width={75} />
        <Card.Title>
          {contact.firstName}
          &nbsp;
          {contact.lastName}
        </Card.Title>
        <Card.Subtitle>{contact.address}</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>{contact.description}</Card.Text>
        <ListGroup variant="flush">
          {noteList.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </ListGroup>
        <AddNoteForm contact={contact} onAddNote={handleAddNote} />
      </Card.Body>
      <Card.Footer>
        <Link href={`/edit/${contact.id}`}>Edit</Link>
      </Card.Footer>
    </Card>
  );
};

export default ContactCard;