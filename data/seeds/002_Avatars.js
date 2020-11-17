exports.seed = function (knex) {
  return knex('Avatars').insert([
    { AvatarURL: 'https://labs28-b-storysquad.s3.amazonaws.com/hero-1.svg' },
    { AvatarURL: 'https://labs28-b-storysquad.s3.amazonaws.com/hero-2.svg' },
    { AvatarURL: 'https://labs28-b-storysquad.s3.amazonaws.com/hero-3.svg' },
    { AvatarURL: 'https://labs28-b-storysquad.s3.amazonaws.com/hero-4.svg' },
    { AvatarURL: 'https://labs28-b-storysquad.s3.amazonaws.com/hero-5.svg' },
    { AvatarURL: 'https://labs28-b-storysquad.s3.amazonaws.com/hero-6.svg' },
    { AvatarURL: 'https://labs28-b-storysquad.s3.amazonaws.com/hero-7.svg' },
    { AvatarURL: 'https://labs28-b-storysquad.s3.amazonaws.com/hero-8.svg' },
    { AvatarURL: 'https://labs28-b-storysquad.s3.amazonaws.com/hero-9.svg' },
    { AvatarURL: 'https://labs28-b-storysquad.s3.amazonaws.com/hero-10.svg' },
  ]);
};
