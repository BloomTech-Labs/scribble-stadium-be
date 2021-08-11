exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Episodes')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('Episodes').insert([
        {
          id: 1,
          StoryID: '1',
          EpisodeNumber: '1',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
        },
        {
          id: 2,
          StoryID: '1',
          EpisodeNumber: '2',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
        },
        {
          id: 3,
          StoryID: '1',
          EpisodeNumber: '3',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
        },
        {
          id: 4,
          StoryID: '1',
          EpisodeNumber: '4',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
        },
        {
          id: 5,
          StoryID: '1',
          EpisodeNumber: '5',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
        },
        {
          id: 6,
          StoryID: '1',
          EpisodeNumber: '6',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
        },
        {
          id: 7,
          StoryID: '1',
          EpisodeNumber: '7',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
        },
        {
          id: 8,
          StoryID: '1',
          EpisodeNumber: '8',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
        },
        {
          id: 9,
          StoryID: '1',
          EpisodeNumber: '9',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
        },
        {
          id: 10,
          StoryID: '1',
          EpisodeNumber: '10',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
        },
      ]);
    });
};
