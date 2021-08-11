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
        },
        {
          ID: 2,
          StoryID: '1',
          EpisodeNumber: '2',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
        },
        {
          ID: 3,
          StoryID: '1',
          EpisodeNumber: '3',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
        },
        {
          ID: 4,
          StoryID: '1',
          EpisodeNumber: '4',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
        },
        {
          ID: 5,
          StoryID: '1',
          EpisodeNumber: '5',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
        },
        {
          ID: 6,
          StoryID: '1',
          EpisodeNumber: '6',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
        },
        {
          ID: 7,
          StoryID: '1',
          EpisodeNumber: '7',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
        },
        {
          ID: 8,
          StoryID: '1',
          EpisodeNumber: '8',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
        },
        {
          ID: 9,
          StoryID: '1',
          EpisodeNumber: '9',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
        },
        {
          ID: 10,
          StoryID: '1',
          EpisodeNumber: '10',
          TextURL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
          AudioURL: 'src/assets/audiofiles/Story-Squad-Week-1-READ-Content.m4a',
        },
      ]);
    });
};
