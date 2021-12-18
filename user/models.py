from django.utils import timezone
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, PermissionsMixin, BaseUserManager
)
from django.contrib.auth.models import Group
import uuid
from django.utils.timezone import now
from core import messages


class UserManager(BaseUserManager):
    """

    User manager

    """

    def create(self, username, password=None, **extra_fields):
        """
        Create a new user

        """
        now = timezone.now()
        if not username:
            raise ValueError(messages.USERNAME_SET_MSG)

        extra = {
            'is_staff': False,
            'is_superuser': False,
            'is_active': True,
            'is_primary': True,
            'last_login': now,
            'date_joined': now
        }

        extra.update(extra_fields)
        user = self.model(username=username, **extra)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username=None, password=None, **extra_fields):
        return self.create(username, password=password, **extra_fields)

    def create_superuser(self, username, password, **extra_fields):
        """

        Create a superuser

        """
        u = self.create(username, password, **extra_fields)
        u.is_staff = True
        u.is_active = True
        u.is_superuser = True
        u.save(using=self._db)
        return u


class User(AbstractBaseUser, PermissionsMixin):

    is_staff = models.BooleanField('is staff', default=False)
    is_primary = models.BooleanField('is primary user', default=False)
    is_active = models.BooleanField('active', default=True)
    date_joined = models.DateTimeField('date joined', default=now, db_index=True)
    username = models.CharField('username',blank=True, max_length=128, db_index=True, unique=True)
    timezone = models.CharField('timezone', max_length=245, blank=True,
                                default='America/New_York',
                                )
    objects = UserManager()
    USERNAME_FIELD = 'username'

    class Meta:
        verbose_name = 'user'

        verbose_name_plural = 'users'

        db_table = 'user'

    @classmethod
    def create_user(cls, username, is_primary=True, is_active=True):
        try:
            user = cls.objects.create_user(username=username,
                                           password=uuid.uuid4().hex,
                                           is_primary=is_primary,
                                           is_active=is_active)
            Group.objects.get_or_create(name='customer')
            return user
        except Exception as e:
            raise e

    def __unicode__(self):
        return self.username

    def get_short_name(self):
        return self.username


class UserDetails(models.Model):
    id = models.IntegerField(primary_key=True)
    # userId = models.ForeignKey(User, null=True)
    userId = models.IntegerField()
    title = models.CharField(max_length=80)
    body = models.CharField(max_length=800)
