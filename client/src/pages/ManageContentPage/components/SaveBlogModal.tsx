import React, { FC, FormEvent } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { SaveBlog } from '../../../models/Blog';
import { Category } from '../../../models/Category';

const editableFields: Array<keyof SaveBlog> = ['categoryId'];
const requiredFields: Array<keyof SaveBlog> = ['rss', 'categoryId'];

type SaveBlogModalProps = {
  blog: SaveBlog;
  categories: Category[];
  isVisible?: boolean;
  onClose: () => void;
  onChange: (event: any) => void;
  onSubmit: (event: FormEvent) => void;
};

const SaveBlogModal: FC<SaveBlogModalProps> = ({
  blog,
  categories,
  isVisible = false,
  onClose,
  onChange,
  onSubmit,
}) => {
  const formControlProps = (name: keyof SaveBlog) => {
    return {
      name,
      value: blog[name],
      disabled: !!blog.id && !editableFields.includes(name),
      required: requiredFields.includes(name),
      onChange: onChange,
    };
  };

  return (
    <Modal show={isVisible} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>{blog.id ? 'Update' : 'Add'} Blog</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
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
          <Button type="submit">{blog.id ? 'Update' : 'Add'}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SaveBlogModal;
