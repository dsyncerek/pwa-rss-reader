import React, { FC, FormEvent } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { SaveBlog } from '../../../models/Blog';
import { Category } from '../../../models/Category';

type SaveBlogModalProps = {
  blog: SaveBlog;
  categories: Category[];
  saving?: boolean;
  error?: string;
  isVisible?: boolean;
  onClose: () => void;
  onChange: (event: any) => void;
  onSubmit: (event: FormEvent) => void;
};

const SaveBlogModal: FC<SaveBlogModalProps> = ({
  blog,
  categories,
  saving,
  error,
  isVisible = false,
  onClose,
  onChange,
  onSubmit,
}) => {
  const editableFields: Array<keyof SaveBlog> = ['categoryId'];
  const requiredFields: Array<keyof SaveBlog> = ['rss', 'categoryId'];

  const formControlProps = (name: keyof SaveBlog) => {
    return {
      name,
      value: blog[name],
      disabled: !!blog.id && !editableFields.includes(name),
      required: requiredFields.includes(name),
      onChange: onChange,
    };
  };

  const actionLabel = blog.id ? 'Update' : 'Add';

  return (
    <Modal show={isVisible} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>{actionLabel} Blog</Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group controlId="rss">
            <Form.Label>RSS</Form.Label>
            <Form.Control {...formControlProps('rss')} placeholder="Enter RSS" />
          </Form.Group>
          <Form.Group controlId="categoryId">
            <Form.Label>Category</Form.Label>
            <Form.Control {...formControlProps('categoryId')} as="select">
              <option disabled={true} value="">
                Select Category
              </option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
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

export default SaveBlogModal;
