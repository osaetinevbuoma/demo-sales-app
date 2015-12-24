'use strict';

$(document).ready(function () {

    var content = "" +
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae lorem tortor. Etiam molestie risus sit amet justo iaculis non rhoncus " +
        "dui ornare. Phasellus sed varius elit. Nullam mi nunc, tempor quis elementum a, sodales lacinia enim. Mauris massa tortor, convallis sed " +
        "pellentesque ac, tempus vel lorem. Quisque pellentesque rutrum dignissim. Nulla at risus fermentum mauris bibendum feugiat id id mauris. " +
        "Curabitur dapibus, ipsum in posuere tempus, lacus turpis bibendum dui, in iaculis quam lacus et sapien. Cras ut nibh vel neque porta " +
        "sollicitudin sed consequat augue. Sed ut nunc magna. Duis pellentesque ultrices est. Suspendisse potenti. Nam lacinia aliquet fermentum.</p>" +
        "<p>Curabitur in dolor turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas libero tortor, " +
        "ultricies eu faucibus eu, sollicitudin quis elit. Quisque tincidunt volutpat consectetur. Morbi in tortor arcu. Integer et leo metus, eu " +
        "semper nunc. Cras quis metus erat, vitae aliquam ante. Praesent pharetra tortor id tellus porta iaculis non et ante. Pellentesque pharetra " +
        "libero ut massa lobortis ut mollis ante pharetra. Aliquam at lobortis risus.</p>" +
        "<p>Aenean lacinia eros a lacus molestie aliquet. Aenean nec odio in neque mollis porta congue pharetra risus. Quisque imperdiet suscipit nisi, " +
        "et euismod lectus viverra in. Donec ultrices erat rutrum velit rhoncus egestas. Donec eu dolor eros. Vivamus nisl justo, scelerisque id " +
        "tristique eget, dictum eu mi. Etiam vehicula eros et tellus pellentesque consectetur. Pellentesque eget arcu quis massa viverra cursus. " +
        "Aenean nec dolor et nunc consectetur tincidunt quis nec sem. Nunc lectus ipsum, hendrerit eget adipiscing nec, accumsan a lectus. Nam risus " +
        "leo, commodo in interdum a, accumsan a sem. Aliquam erat volutpat. Nulla facilisi.</p>";

    // Privacy Policy Content
    $('#privacyPolicyBody').html(content);

    // Terms of Use content
    $('#termsOfUseBody').html(content);

    // Handle support form submission
    $('#supportForm').submit(function (event) {
        event.preventDefault();

        $(this).find('input').attr({ disabled: true });
        $(this).find('textarea').attr({ disabled: true });
        $(this).find('button').attr({ disabled: true });

        $('#response').html('<div class="alert alert-success"><i class="fa fa-check"></i> Request is sent successfully</div>');

        setTimeout(function () {
            $('#supportModal').modal('hide');
            $('#supportForm').find('input').attr({ disabled: false }).val('');
            $('#supportForm').find('textarea').attr({ disabled: false }).val('');
            $('#supportForm').find('button').attr({ disabled: false });
            $('#response').html('');
        }, 1000);
    });
});