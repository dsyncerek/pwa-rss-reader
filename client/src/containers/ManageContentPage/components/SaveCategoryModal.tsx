import React, { FC, FormEvent } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { SaveCategory } from '../../../models/Category';

type SaveCategoryModalProps = {
  category: SaveCategory;
  saving?: boolean;
  error?: string;
  isVisible?: boolean;
  onClose: () => void;
  onChange: (event: any) => void;
  onSubmit: (event: FormEvent) => void;
};

const SaveCategoryModal: FC<SaveCategoryModalProps> = ({
  category,
  saving,
  error,
  isVisible = false,
  onClose,
  onChange,
  onSubmit,
}) => {
  const editableFields: Array<keyof SaveCategory> = ['name'];
  const requiredFields: Array<keyof SaveCategory> = ['name'];

  const formControlProps = (name: keyof SaveCategory) => {
    return {
      name,
      value: category[name],
      disabled: !!category.id && !editableFields.includes(name),
      required: requiredFields.includes(name),
      onChange: onChange,
    };
  };

  return (
    <Modal show={isVisible} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>{category.id ? 'Update' : 'Add'} Category</Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control {...formControlProps('name')} placeholder="Enter Name" />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            Close
          </Button>
          <Button type="submit" disabled={saving}>
            {category.id ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SaveCategoryModal;
