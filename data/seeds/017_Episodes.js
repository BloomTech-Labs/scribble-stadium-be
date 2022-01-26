exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Episodes')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('Episodes').insert([
        {
          ID: 1,
          StoryID: '1',
          EpisodeNumber: '1',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
          Content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum ligula et lacus consequat, eu finibus erat pellentesque. Maecenas velit tellus, dapibus at eleifend at, feugiat et dolor. Etiam egestas diam at augue lacinia mollis. Morbi tempor urna libero, eget aliquet felis auctor vitae. Nunc quis vulputate nibh. Nulla varius eros at tellus interdum interdum. Ut odio neque, feugiat sed libero eget, volutpat volutpat odio. Sed euismod massa sit amet dapibus facilisis. Mauris finibus egestas elit at fringilla. Maecenas fringilla urna vel est pretium laoreet. Sed tristique, nulla vitae fermentum pharetra, sem massa sagittis est, sit amet porta libero erat ut massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quis nunc sit amet sapien fermentum lobortis. Proin arcu elit, blandit id molestie in, pharetra interdum massa. Suspendisse blandit risus purus, nec ornare mi tristique at. Sed blandit mauris id ex condimentum, vel eleifend erat placerat. Vivamus viverra ex non congue pharetra. Maecenas dapibus turpis non libero tempor, ac porttitor nibh ultrices. Vivamus eu porttitor ligula. Aliquam erat volutpat. Maecenas sed porta quam. Mauris eget sem mauris. Vestibulum eu consequat libero. Mauris posuere neque nec lorem venenatis lobortis. Sed luctus vehicula nibh ut auctor. Ut sodales nisl odio, at faucibus sapien porta vel. In feugiat nisl mauris, eu ultrices arcu dignissim a. Curabitur maximus eleifend enim, sed faucibus quam rhoncus at. Morbi eu arcu arcu. Nullam et iaculis turpis.',
        },
        {
          ID: 2,
          StoryID: '1',
          EpisodeNumber: '2',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
          Content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum ligula et lacus consequat, eu finibus erat pellentesque. Maecenas velit tellus, dapibus at eleifend at, feugiat et dolor. Etiam egestas diam at augue lacinia mollis. Morbi tempor urna libero, eget aliquet felis auctor vitae. Nunc quis vulputate nibh. Nulla varius eros at tellus interdum interdum. Ut odio neque, feugiat sed libero eget, volutpat volutpat odio. Sed euismod massa sit amet dapibus facilisis. Mauris finibus egestas elit at fringilla. Maecenas fringilla urna vel est pretium laoreet. Sed tristique, nulla vitae fermentum pharetra, sem massa sagittis est, sit amet porta libero erat ut massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quis nunc sit amet sapien fermentum lobortis. Proin arcu elit, blandit id molestie in, pharetra interdum massa. Suspendisse blandit risus purus, nec ornare mi tristique at. Sed blandit mauris id ex condimentum, vel eleifend erat placerat. Vivamus viverra ex non congue pharetra. Maecenas dapibus turpis non libero tempor, ac porttitor nibh ultrices. Vivamus eu porttitor ligula. Aliquam erat volutpat. Maecenas sed porta quam. Mauris eget sem mauris. Vestibulum eu consequat libero. Mauris posuere neque nec lorem venenatis lobortis. Sed luctus vehicula nibh ut auctor. Ut sodales nisl odio, at faucibus sapien porta vel. In feugiat nisl mauris, eu ultrices arcu dignissim a. Curabitur maximus eleifend enim, sed faucibus quam rhoncus at. Morbi eu arcu arcu. Nullam et iaculis turpis.',
        },
        {
          ID: 3,
          StoryID: '1',
          EpisodeNumber: '3',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
          Content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum ligula et lacus consequat, eu finibus erat pellentesque. Maecenas velit tellus, dapibus at eleifend at, feugiat et dolor. Etiam egestas diam at augue lacinia mollis. Morbi tempor urna libero, eget aliquet felis auctor vitae. Nunc quis vulputate nibh. Nulla varius eros at tellus interdum interdum. Ut odio neque, feugiat sed libero eget, volutpat volutpat odio. Sed euismod massa sit amet dapibus facilisis. Mauris finibus egestas elit at fringilla. Maecenas fringilla urna vel est pretium laoreet. Sed tristique, nulla vitae fermentum pharetra, sem massa sagittis est, sit amet porta libero erat ut massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quis nunc sit amet sapien fermentum lobortis. Proin arcu elit, blandit id molestie in, pharetra interdum massa. Suspendisse blandit risus purus, nec ornare mi tristique at. Sed blandit mauris id ex condimentum, vel eleifend erat placerat. Vivamus viverra ex non congue pharetra. Maecenas dapibus turpis non libero tempor, ac porttitor nibh ultrices. Vivamus eu porttitor ligula. Aliquam erat volutpat. Maecenas sed porta quam. Mauris eget sem mauris. Vestibulum eu consequat libero. Mauris posuere neque nec lorem venenatis lobortis. Sed luctus vehicula nibh ut auctor. Ut sodales nisl odio, at faucibus sapien porta vel. In feugiat nisl mauris, eu ultrices arcu dignissim a. Curabitur maximus eleifend enim, sed faucibus quam rhoncus at. Morbi eu arcu arcu. Nullam et iaculis turpis.',
        },
        {
          ID: 4,
          StoryID: '1',
          EpisodeNumber: '4',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
          Content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum ligula et lacus consequat, eu finibus erat pellentesque. Maecenas velit tellus, dapibus at eleifend at, feugiat et dolor. Etiam egestas diam at augue lacinia mollis. Morbi tempor urna libero, eget aliquet felis auctor vitae. Nunc quis vulputate nibh. Nulla varius eros at tellus interdum interdum. Ut odio neque, feugiat sed libero eget, volutpat volutpat odio. Sed euismod massa sit amet dapibus facilisis. Mauris finibus egestas elit at fringilla. Maecenas fringilla urna vel est pretium laoreet. Sed tristique, nulla vitae fermentum pharetra, sem massa sagittis est, sit amet porta libero erat ut massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quis nunc sit amet sapien fermentum lobortis. Proin arcu elit, blandit id molestie in, pharetra interdum massa. Suspendisse blandit risus purus, nec ornare mi tristique at. Sed blandit mauris id ex condimentum, vel eleifend erat placerat. Vivamus viverra ex non congue pharetra. Maecenas dapibus turpis non libero tempor, ac porttitor nibh ultrices. Vivamus eu porttitor ligula. Aliquam erat volutpat. Maecenas sed porta quam. Mauris eget sem mauris. Vestibulum eu consequat libero. Mauris posuere neque nec lorem venenatis lobortis. Sed luctus vehicula nibh ut auctor. Ut sodales nisl odio, at faucibus sapien porta vel. In feugiat nisl mauris, eu ultrices arcu dignissim a. Curabitur maximus eleifend enim, sed faucibus quam rhoncus at. Morbi eu arcu arcu. Nullam et iaculis turpis.',
        },
        {
          ID: 5,
          StoryID: '1',
          EpisodeNumber: '5',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
          Content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum ligula et lacus consequat, eu finibus erat pellentesque. Maecenas velit tellus, dapibus at eleifend at, feugiat et dolor. Etiam egestas diam at augue lacinia mollis. Morbi tempor urna libero, eget aliquet felis auctor vitae. Nunc quis vulputate nibh. Nulla varius eros at tellus interdum interdum. Ut odio neque, feugiat sed libero eget, volutpat volutpat odio. Sed euismod massa sit amet dapibus facilisis. Mauris finibus egestas elit at fringilla. Maecenas fringilla urna vel est pretium laoreet. Sed tristique, nulla vitae fermentum pharetra, sem massa sagittis est, sit amet porta libero erat ut massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quis nunc sit amet sapien fermentum lobortis. Proin arcu elit, blandit id molestie in, pharetra interdum massa. Suspendisse blandit risus purus, nec ornare mi tristique at. Sed blandit mauris id ex condimentum, vel eleifend erat placerat. Vivamus viverra ex non congue pharetra. Maecenas dapibus turpis non libero tempor, ac porttitor nibh ultrices. Vivamus eu porttitor ligula. Aliquam erat volutpat. Maecenas sed porta quam. Mauris eget sem mauris. Vestibulum eu consequat libero. Mauris posuere neque nec lorem venenatis lobortis. Sed luctus vehicula nibh ut auctor. Ut sodales nisl odio, at faucibus sapien porta vel. In feugiat nisl mauris, eu ultrices arcu dignissim a. Curabitur maximus eleifend enim, sed faucibus quam rhoncus at. Morbi eu arcu arcu. Nullam et iaculis turpis.',
        },
        {
          ID: 6,
          StoryID: '1',
          EpisodeNumber: '6',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
          Content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum ligula et lacus consequat, eu finibus erat pellentesque. Maecenas velit tellus, dapibus at eleifend at, feugiat et dolor. Etiam egestas diam at augue lacinia mollis. Morbi tempor urna libero, eget aliquet felis auctor vitae. Nunc quis vulputate nibh. Nulla varius eros at tellus interdum interdum. Ut odio neque, feugiat sed libero eget, volutpat volutpat odio. Sed euismod massa sit amet dapibus facilisis. Mauris finibus egestas elit at fringilla. Maecenas fringilla urna vel est pretium laoreet. Sed tristique, nulla vitae fermentum pharetra, sem massa sagittis est, sit amet porta libero erat ut massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quis nunc sit amet sapien fermentum lobortis. Proin arcu elit, blandit id molestie in, pharetra interdum massa. Suspendisse blandit risus purus, nec ornare mi tristique at. Sed blandit mauris id ex condimentum, vel eleifend erat placerat. Vivamus viverra ex non congue pharetra. Maecenas dapibus turpis non libero tempor, ac porttitor nibh ultrices. Vivamus eu porttitor ligula. Aliquam erat volutpat. Maecenas sed porta quam. Mauris eget sem mauris. Vestibulum eu consequat libero. Mauris posuere neque nec lorem venenatis lobortis. Sed luctus vehicula nibh ut auctor. Ut sodales nisl odio, at faucibus sapien porta vel. In feugiat nisl mauris, eu ultrices arcu dignissim a. Curabitur maximus eleifend enim, sed faucibus quam rhoncus at. Morbi eu arcu arcu. Nullam et iaculis turpis.',
        },
        {
          ID: 7,
          StoryID: '1',
          EpisodeNumber: '7',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
          Content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum ligula et lacus consequat, eu finibus erat pellentesque. Maecenas velit tellus, dapibus at eleifend at, feugiat et dolor. Etiam egestas diam at augue lacinia mollis. Morbi tempor urna libero, eget aliquet felis auctor vitae. Nunc quis vulputate nibh. Nulla varius eros at tellus interdum interdum. Ut odio neque, feugiat sed libero eget, volutpat volutpat odio. Sed euismod massa sit amet dapibus facilisis. Mauris finibus egestas elit at fringilla. Maecenas fringilla urna vel est pretium laoreet. Sed tristique, nulla vitae fermentum pharetra, sem massa sagittis est, sit amet porta libero erat ut massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quis nunc sit amet sapien fermentum lobortis. Proin arcu elit, blandit id molestie in, pharetra interdum massa. Suspendisse blandit risus purus, nec ornare mi tristique at. Sed blandit mauris id ex condimentum, vel eleifend erat placerat. Vivamus viverra ex non congue pharetra. Maecenas dapibus turpis non libero tempor, ac porttitor nibh ultrices. Vivamus eu porttitor ligula. Aliquam erat volutpat. Maecenas sed porta quam. Mauris eget sem mauris. Vestibulum eu consequat libero. Mauris posuere neque nec lorem venenatis lobortis. Sed luctus vehicula nibh ut auctor. Ut sodales nisl odio, at faucibus sapien porta vel. In feugiat nisl mauris, eu ultrices arcu dignissim a. Curabitur maximus eleifend enim, sed faucibus quam rhoncus at. Morbi eu arcu arcu. Nullam et iaculis turpis.',
        },
        {
          ID: 8,
          StoryID: '1',
          EpisodeNumber: '8',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
          Content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum ligula et lacus consequat, eu finibus erat pellentesque. Maecenas velit tellus, dapibus at eleifend at, feugiat et dolor. Etiam egestas diam at augue lacinia mollis. Morbi tempor urna libero, eget aliquet felis auctor vitae. Nunc quis vulputate nibh. Nulla varius eros at tellus interdum interdum. Ut odio neque, feugiat sed libero eget, volutpat volutpat odio. Sed euismod massa sit amet dapibus facilisis. Mauris finibus egestas elit at fringilla. Maecenas fringilla urna vel est pretium laoreet. Sed tristique, nulla vitae fermentum pharetra, sem massa sagittis est, sit amet porta libero erat ut massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quis nunc sit amet sapien fermentum lobortis. Proin arcu elit, blandit id molestie in, pharetra interdum massa. Suspendisse blandit risus purus, nec ornare mi tristique at. Sed blandit mauris id ex condimentum, vel eleifend erat placerat. Vivamus viverra ex non congue pharetra. Maecenas dapibus turpis non libero tempor, ac porttitor nibh ultrices. Vivamus eu porttitor ligula. Aliquam erat volutpat. Maecenas sed porta quam. Mauris eget sem mauris. Vestibulum eu consequat libero. Mauris posuere neque nec lorem venenatis lobortis. Sed luctus vehicula nibh ut auctor. Ut sodales nisl odio, at faucibus sapien porta vel. In feugiat nisl mauris, eu ultrices arcu dignissim a. Curabitur maximus eleifend enim, sed faucibus quam rhoncus at. Morbi eu arcu arcu. Nullam et iaculis turpis.',
        },
        {
          ID: 9,
          StoryID: '1',
          EpisodeNumber: '9',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
          Content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum ligula et lacus consequat, eu finibus erat pellentesque. Maecenas velit tellus, dapibus at eleifend at, feugiat et dolor. Etiam egestas diam at augue lacinia mollis. Morbi tempor urna libero, eget aliquet felis auctor vitae. Nunc quis vulputate nibh. Nulla varius eros at tellus interdum interdum. Ut odio neque, feugiat sed libero eget, volutpat volutpat odio. Sed euismod massa sit amet dapibus facilisis. Mauris finibus egestas elit at fringilla. Maecenas fringilla urna vel est pretium laoreet. Sed tristique, nulla vitae fermentum pharetra, sem massa sagittis est, sit amet porta libero erat ut massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quis nunc sit amet sapien fermentum lobortis. Proin arcu elit, blandit id molestie in, pharetra interdum massa. Suspendisse blandit risus purus, nec ornare mi tristique at. Sed blandit mauris id ex condimentum, vel eleifend erat placerat. Vivamus viverra ex non congue pharetra. Maecenas dapibus turpis non libero tempor, ac porttitor nibh ultrices. Vivamus eu porttitor ligula. Aliquam erat volutpat. Maecenas sed porta quam. Mauris eget sem mauris. Vestibulum eu consequat libero. Mauris posuere neque nec lorem venenatis lobortis. Sed luctus vehicula nibh ut auctor. Ut sodales nisl odio, at faucibus sapien porta vel. In feugiat nisl mauris, eu ultrices arcu dignissim a. Curabitur maximus eleifend enim, sed faucibus quam rhoncus at. Morbi eu arcu arcu. Nullam et iaculis turpis.',
        },
        {
          ID: 10,
          StoryID: '1',
          EpisodeNumber: '10',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
          Content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum ligula et lacus consequat, eu finibus erat pellentesque. Maecenas velit tellus, dapibus at eleifend at, feugiat et dolor. Etiam egestas diam at augue lacinia mollis. Morbi tempor urna libero, eget aliquet felis auctor vitae. Nunc quis vulputate nibh. Nulla varius eros at tellus interdum interdum. Ut odio neque, feugiat sed libero eget, volutpat volutpat odio. Sed euismod massa sit amet dapibus facilisis. Mauris finibus egestas elit at fringilla. Maecenas fringilla urna vel est pretium laoreet. Sed tristique, nulla vitae fermentum pharetra, sem massa sagittis est, sit amet porta libero erat ut massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quis nunc sit amet sapien fermentum lobortis. Proin arcu elit, blandit id molestie in, pharetra interdum massa. Suspendisse blandit risus purus, nec ornare mi tristique at. Sed blandit mauris id ex condimentum, vel eleifend erat placerat. Vivamus viverra ex non congue pharetra. Maecenas dapibus turpis non libero tempor, ac porttitor nibh ultrices. Vivamus eu porttitor ligula. Aliquam erat volutpat. Maecenas sed porta quam. Mauris eget sem mauris. Vestibulum eu consequat libero. Mauris posuere neque nec lorem venenatis lobortis. Sed luctus vehicula nibh ut auctor. Ut sodales nisl odio, at faucibus sapien porta vel. In feugiat nisl mauris, eu ultrices arcu dignissim a. Curabitur maximus eleifend enim, sed faucibus quam rhoncus at. Morbi eu arcu arcu. Nullam et iaculis turpis.',
        },
      ]);
    });
};
