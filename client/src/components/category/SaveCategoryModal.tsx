import React, { FC, FormEvent } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { SaveCategory } from '../../models/Category';

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

  const actionLabel = category.id ? 'Update' : 'Add';

  return (
    <Modal show={isVisible} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>{actionLabel} Category</Modal.Title>
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
            {saving ? <span className="fas fa-fw fa-spin fa-spinner" /> : <> {actionLabel}</>}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SaveCategoryModal;
