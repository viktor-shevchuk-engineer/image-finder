import { Component } from 'react';

import Modal from 'components/Modal';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

class App extends Component {
  state = { showModal: false, photos: [], modalPhoto: null };

  componentDidMount() {
    fetch(
      'https://pixabay.com/api/?q=cat&page=1&key=24568502-5ca9f026ce5836891cf338e0e&image_type=photo&orientation=horizontal&per_page=12'
    )
      .then((response) => response.json())
      .then(({ hits }) => {
        this.setState({ photos: hits });
      });
  }

  toggleModal = (modalPhoto) => {
    modalPhoto && this.setState({ modalPhoto });

    this.setState((state) => ({ showModal: !state.showModal }));
  };

  render() {
    const { showModal, photos, modalPhoto } = this.state;

    return (
      <div>
        <Searchbar />

        {showModal && (
          <Modal onClose={this.toggleModal} modalPhoto={modalPhoto} />
        )}

        {photos.length && (
          <ImageGallery photos={photos} onPhotoClick={this.toggleModal} />
        )}
      </div>
    );
  }
}

export default App;