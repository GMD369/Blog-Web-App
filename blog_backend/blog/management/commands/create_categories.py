from django.core.management.base import BaseCommand
from blog.models import Category

class Command(BaseCommand):
    help = 'Create default categories for the blog'

    def handle(self, *args, **options):
        categories = [
            'Technology',
            'Travel',
            'Food',
            'Lifestyle',
            'Health',
            'Education',
            'Business',
            'Entertainment',
            'Sports',
            'Science',
            'Art',
            'Music',
            'Books',
            'Movies',
            'Gaming',
            'Fashion',
            'Beauty',
            'Parenting',
            'Finance',
            'Politics'
        ]

        created_count = 0
        for category_name in categories:
            category, created = Category.objects.get_or_create(name=category_name)
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'Successfully created category "{category_name}"')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Category "{category_name}" already exists')
                )

        self.stdout.write(
            self.style.SUCCESS(f'Created {created_count} new categories out of {len(categories)} total')
        ) 