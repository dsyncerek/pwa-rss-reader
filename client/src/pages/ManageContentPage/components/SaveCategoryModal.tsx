import React, { FC, FormEvent } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { SaveCategory } from '../../../models/Category';

const editableFields: Array<keyof SaveCategory> = ['name'];
const requiredFields: Array<keyof SaveCategory> = ['name'];

type SaveCategoryModalProps = {
  category: SaveCategory;
  isVisible?: boolean;
  onClose: () => void;
  onChange: (event: any) => void;
  onSubmit: (event: FormEvent) => void;
};

const SaveCategoryModal: FC<SaveCategoryModalProps> = ({
  category,
  isVisible = false,
  onClose,
  onChange,
  onSubmit,
}) => {
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
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control {...formControlProps('name')} placeholder="Enter Name" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            Close
          </Button>
          <Button type="submit">{category.id ? 'Update' : 'Add'}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SaveCategoryModal;
