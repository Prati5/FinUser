from rest_framework import permissions
from django.db.models import Q
import logging

logger = logging.getLogger(__name__)


class IsAnonymous(permissions.BasePermission):
    """Allows access only anonymous users."""

    def has_permission(self, request, view):
        if not request.user.is_anonymous():
            return False
        return super(IsAnonymous, self).has_permission(request, view)


class IsAdminOrSelf(permissions.IsAuthenticated):
    """
    Allow an action to be taken by an administrator
    or the user.
    """

    def has_object_permission(self, request, view, obj):

        if request.user.is_active and request.user.is_authenticated():
            staff = (request.user.groups
                     .filter(Q(name='administrators'))
                     .exists())

            if staff:
                return True

        return True
