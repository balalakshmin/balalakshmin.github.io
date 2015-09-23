/*
Author URI: http://webthemez.com/
Note: 
Licence under Creative Commons Attribution 3.0 
Do not remove the back-link in this web template 
-------------------------------------------------------*/

$(window).load(function() {
    jQuery('#all').click();
    return false;
});

$(document).ready(function() {
    $('#header_wrapper').scrollToFixed();
    $('.res-nav_click').click(function() {
        $('.main-nav').slideToggle();
        return false

    });

    $('#msg').click(function() {
        $('#fr1').attr('action', 'mailto:bala94.n@gmail.com?subject=' +
                       "hi" + '&body=' + $('#msgbody').html());
        $('#fr1').submit();
        alert("sent");
    });
	
    function resizeText() {
        var preferredWidth = 767;
        var displayWidth = window.innerWidth;
        var percentage = displayWidth / preferredWidth;
        var fontsizetitle = 25;
        var newFontSizeTitle = Math.floor(fontsizetitle * percentage);
        $(".divclass").css("font-size", newFontSizeTitle)
    }
    if ($('#main-nav ul li:first-child').hasClass('active')) {
        $('#main-nav').css('background', 'none');
    }
    $('#mainNav').onePageNav({
        currentClass: 'active',
        changeHash: false,
        scrollSpeed: 950,
        scrollThreshold: 0.2,
        filter: '',
        easing: 'swing',
        begin: function() {
        },
        end: function() {
            if (!$('#main-nav ul li:first-child').hasClass('active')) {
                $('.header').addClass('addBg');
            } else {
                $('.header').removeClass('addBg');
            }

        },
        scrollChange: function($currentListItem) {
            if (!$('#main-nav ul li:first-child').hasClass('active')) {
                $('.header').addClass('addBg');
            } else {
                $('.header').removeClass('addBg');
            }
        }
    });

    var container = $('#portfolio_wrapper');


    container.isotope({
        animationEngine: 'best-available',
        animationOptions: {
            duration: 200,
            queue: false
        },
        layoutMode: 'fitRows'
    });

    $('#filters a').click(function() {
        $('#filters a').removeClass('active');
        $(this).addClass('active');
        var selector = $(this).attr('data-filter');
        container.isotope({
            filter: selector
        });
        setProjects();
        return false;
    });

    function splitColumns() {
        var winWidth = $(window).width(),
            columnNumb = 1;


        if (winWidth > 1024) {
            columnNumb = 4;
        } else if (winWidth > 900) {
            columnNumb = 2;
        } else if (winWidth > 479) {
            columnNumb = 2;
        } else if (winWidth < 479) {
            columnNumb = 1;
        }

        return columnNumb;
    }
	
    function setColumns() {
        var winWidth = $(window).width(),
            columnNumb = splitColumns(),
            postWidth = Math.floor(winWidth / columnNumb);

        container.find('.portfolio-item').each(function() {
            $(this).css({
                width: postWidth + 'px'
            });
        });
    }

    function setProjects() {
        setColumns();
        container.isotope('reLayout');
    }

    container.imagesLoaded(function() {
        setColumns();
    });


    $(window).bind('resize', function() {
        setProjects();
    });

   $(".fancybox").fancybox();
});

wow = new WOW({
    animateClass: 'animated',
    offset: 100
});
wow.init();
document.getElementById('').onclick = function() {
    var section = document.createElement('section');
    section.className = 'wow fadeInDown';
    section.className = 'wow shake';
    section.className = 'wow zoomIn';
    section.className = 'wow lightSpeedIn';
    this.parentNode.insertBefore(section, this);
};

/**
 * Overlay for images (gallery)
 *
 * @param {string} theme
 */
var openGallery = function(theme)
{
    $(this).magnificPopup
    ({
        mainClass: theme + ' mfp-with-zoom', // no zoom, just for bg fadeIn
        overflowY: 'hidden',
        delegate: '> li > a',
        type: 'image',
        gallery:
        {
            enabled: true
        },
        callbacks:
        {
            /**
             * Adds custom parameters to markup
             * For example data-description on <a> can be used as mfp-description in markup html
             *
             * @param template
             * @param values
             * @param item
             */
            markupParse: function(template, values, item)
            {
                values.description = item.el.data('description'); // or item.img.data('description');
            }
        },
        image:
        {
            headerFit: true,
            captionFit: true,
            preserveHeaderAndCaptionWidth: false,
            markup:
            '<div class="mfp-figure">'+
                '<figure>'+
                    '<header class="mfp-header">'+
                        '<div class="mfp-top-bar">'+
                            '<div class="mfp-title"></div>'+
                            '<div class="mfp-close"></div>'+
                            '<div class="mfp-decoration"></div>'+
                        '</div>'+
                    '</header>'+
                    '<section class="mfp-content-container">'+
                        '<div class="mfp-img"></div>'+
                    '</section>'+
                    '<footer class="mfp-footer">'+
                        '<figcaption class="mfp-figcaption">'+
                            '<div class="mfp-bottom-bar-container">'+
                                '<div class="mfp-bottom-bar">'+
                                    '<div class="mfp-counter"></div>'+
                                    '<div class="mfp-description"></div>'+
                                    '<div class="mfp-decoration"></div>'+
                                '</div>'+
                            '</div>'+
                        '</figcaption>'+
                    '</footer>'+
                '</figure>'+
            '</div>',
            titleSrc: function(item)
            {
                return item.el.attr('title');
            }
        }
    });
};

// Galleries
$('.magnific-gallery').each(function()
{
    openGallery.call(this, 'mfp-example');
});

$(function()
{
    /**
     * Adds header & caption functionality
     * @author Marcin Gil <mg@ovos.at>
     */
    $.extend(true, $.magnificPopup.defaults,
    {
        /**
         * Resizes the overlay to fit the screen together with header & caption
         */
        resize: function()
        {
            // clear resize timeout
            clearTimeout(this.st.resizeTimeout);

            // resize event may be invoked before the overlay was opened or by other type of overlay
            if(!this.isOpen || this.currItem.type !== 'image') return;

            // remove class which enables table layout
            this.wrap.removeClass('mfp-table');
            // clear width on image container
            if(this.st.image.preserveHeaderAndCaptionWidth)
            {
                this.currItem.img.parent().css('width', '');
            }

            // ensure that DOM elements are rendered before we ask for sizes, otherwise we get random heights
            $.fn.redraw = function()
            {
                return this.hide(0, function()
                {
                    $(this).show();
                });
            };
            this.content.redraw();

            // read max-height set by updateSize() at the end of open()
            var originalMaxHeight = parseInt(this.currItem.img.css('max-height'), 10);
            var maxHeight = originalMaxHeight;

            // find header & caption elements
            var figureHeader = this.content.find('.mfp-header');
            var figureCaption = this.content.find('.mfp-figcaption').children().first(); // first child is "table-caption"
            var originalFigureHeaderHeight, originalFigureCaptionHeight;

            // if headerFit is enabled and header exists, subtract it's height from max-height
            if(this.st.image.headerFit && figureHeader)
            {
                originalFigureHeaderHeight = figureHeader.outerHeight(true);
                maxHeight-= originalFigureHeaderHeight;
            }
            // if captionFit is enabled and caption exists, subtract it's height from max-height
            if(this.st.image.captionFit && figureCaption)
            {
                originalFigureCaptionHeight = figureCaption.outerHeight(true);
                maxHeight-= originalFigureCaptionHeight;
            }
            // set new max-height if it has changed
            if(maxHeight != originalMaxHeight)
            {
                this.currItem.img.css('max-height', maxHeight);
                originalMaxHeight = maxHeight;
            }

            // function changing layout from block to table when image is smaller than visible area
            // this prevents from header & caption from expanding the overlay
            var setWrapSize = function(currItem)
            {
                var imageWidth = currItem.img.outerWidth();
                var bodyWidth = $('body').width() - parseInt(this.container.css('padding-left'), 10) - parseInt(this.container.css('padding-right'), 10);
                if(imageWidth < bodyWidth)
                {
                    this.wrap.addClass('mfp-table');
                }

                // apply necessary corrections if header or caption got higher
                var figureHeaderHeight, figureCaptionHeight;

                // if headerFit is enabled and header exists, subtract it's height from max-height
                if(this.st.image.headerFit && figureHeader)
                {
                    figureHeaderHeight = figureHeader.outerHeight(true);
                    if(figureHeaderHeight > originalFigureHeaderHeight)
                    {
                        maxHeight-= figureHeaderHeight - originalFigureHeaderHeight;
                    }
                }
                // if captionFit is enabled and caption exists, subtract it's height from max-height
                if(this.st.image.captionFit && figureCaption)
                {
                    figureCaptionHeight = figureCaption.outerHeight(true);
                    if(figureCaptionHeight > originalFigureCaptionHeight)
                    {
                        maxHeight-= figureCaptionHeight - originalFigureCaptionHeight;
                    }
                }

                // set new max-height if it has changed
                if(maxHeight != originalMaxHeight)
                {
                    currItem.img.css('max-height', maxHeight);

                    // when we change image's max-height, header and caption will get narrower
                    // this creates a risk that text will fold into more lines
                    // and header/caption won't fit on the screen anymore
                    if(this.st.image.preserveHeaderAndCaptionWidth)
                    {
                        currItem.img.parent().css('width', imageWidth);
                    }
                }

                delete this.st.callbacks.imageHasSize;
            };

            // if image is already loaded, call setWrapSize
            if(this.currItem.hasSize)
            {
                setWrapSize.call(this, this.currItem);
            }
            // if image is still loading, attach is to imageHasSize event
            else
            {
                this.st.callbacks.imageHasSize = setWrapSize;
            }
        },
        callbacks:
        {
            /**
             * Open event
             */
            open: function()
            {
                this.st.resize.call(this);
            },
            /**
             * Resize event
             */
            resize: function()
            {
                // buffered call
                var self = this;
                clearTimeout(this.st.resizeTimeout);
                this.st.resizeTimeout = setTimeout(function()
                {
                    self.st.resize.call(self);
                }, 100);
            },
            /**
             * After change event
             */
            afterChange: function()
            {
                this.st.resize.call(this);
            }
        },
        image:
        {
            headerFit: true,
            captionFit: true,
            preserveHeaderAndCaptionWidth: false,
            markup:
            '<div class="mfp-figure">'+
                '<figure>'+
                    '<header class="mfp-header">'+
                        '<div class="mfp-top-bar">'+
                            '<div class="mfp-title"></div>'+
                            '<div class="mfp-close"></div>'+
                        '</div>'+
                    '</header>'+
                    '<section class="mfp-content-container">'+
                        '<div class="mfp-img"></div>'+
                    '</section>'+
                    '<footer class="mfp-footer">'+
                        '<figcaption class="mfp-figcaption">'+
                            '<div class="mfp-bottom-bar-container">'+
                                '<div class="mfp-bottom-bar">'+
                                    '<div class="mfp-counter"></div>'+
                                    '<div class="mfp-description"></div>'+
                                '</div>'+
                            '</div>'+
                        '</figcaption>'+
                    '</footer>'+
                '</figure>'+
            '</div>'
        }
    });
});
